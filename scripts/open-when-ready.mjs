// Ждёт, пока порт начнёт отвечать, и открывает его в браузере.
//
// Нужен bat-файлам: они запускают сервер в основном окне, а вкладку надо открыть
// не раньше, чем он поднимется, иначе пользователь видит «не удалось подключиться»
// и жмёт F5 вручную.
//
// Адрес всегда 127.0.0.1, не localhost — CLAUDE.md (VPN/прокси в браузере).
//
// Запуск: node scripts/open-when-ready.mjs <порт> [путь]

import { spawn } from "node:child_process";
import { connect } from "node:net";

const HOST = "127.0.0.1";
const port = Number(process.argv[2]);
const path = process.argv[3] ?? "/";
const TIMEOUT_MS = 90_000;
const RETRY_MS = 400;

if (!Number.isInteger(port) || port <= 0) {
  console.error("open-when-ready — нужен порт: node scripts/open-when-ready.mjs 3000");
  process.exit(1);
}

/** Одна проба TCP-коннекта: резолвится true, если порт принял соединение. */
const probe = () =>
  new Promise((res) => {
    const sock = connect({ host: HOST, port });
    const done = (ok) => {
      sock.destroy();
      res(ok);
    };
    sock.once("connect", () => done(true));
    sock.once("error", () => done(false));
    sock.setTimeout(RETRY_MS, () => done(false));
  });

const url = `http://${HOST}:${port}${path}`;
const deadline = Date.now() + TIMEOUT_MS;

while (Date.now() < deadline) {
  if (await probe()) {
    // start — команда самого cmd, поэтому только через оболочку. Пустые кавычки —
    // это заголовок окна: без них start съел бы URL в кавычках как заголовок.
    if (process.platform === "win32") {
      spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore" }).unref();
    } else {
      const opener = process.platform === "darwin" ? "open" : "xdg-open";
      spawn(opener, [url], { detached: true, stdio: "ignore" }).unref();
    }
    console.log(`open-when-ready — открыл ${url}`);
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, RETRY_MS));
}

console.error(`open-when-ready — порт ${port} не ответил за ${TIMEOUT_MS / 1000} с. Открой вручную: ${url}`);
process.exit(1);
