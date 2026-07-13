"use client";

import { useEffect, useState } from "react";

/**
 * Локальное время Ростова-на-Дону в статус-строке футера. МСК = Europe/Moscow
 * (UTC+3, без переходов на летнее время). Прогрессивное улучшение: SSR и режим
 * без JS показывают просто «МСК»; при живом JS строка дополняется городом и
 * временем и обновляется раз в минуту. Первый клиентский рендер совпадает с
 * SSR («МСК») — без рассинхрона гидратации.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Moscow",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return time ? (
    <span className="tnum">Ростов-на-Дону, {time} МСК</span>
  ) : (
    <span>МСК</span>
  );
}
