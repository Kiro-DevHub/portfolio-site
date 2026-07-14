@echo off
rem === Kiro.dev - client mode (what the customer sees: prod static from out/) ===
rem
rem Always rebuilds, so nobody is ever shown yesterday's build.
rem KEEP PURE ASCII + chcp 65001 for child output - see the note in dev.bat.
rem
rem Usage: client.bat           - build, then serve (normal double-click)
rem        client.bat nobuild   - serve only; start-all.bat uses this because it
rem                               already built. Two "next" processes must never
rem                               run at once: dev and build share the .next
rem                               folder and the build dies in the race.
chcp 65001 >nul

title Kiro.dev - client preview
cd /d "%~dp0"

if not exist "node_modules\" (
  echo [client] node_modules is missing, installing dependencies...
  call npm install
  if errorlevel 1 goto fail
)

if /i "%~1"=="nobuild" (
  echo   [client] Skipping build - start-all.bat already built out/.
  goto serve
)

echo.
echo   [client] Building production static (npm run build), takes ~20-30s...
echo.
call npm run build
if errorlevel 1 goto fail

:serve
if not exist "out\index.html" (
  echo   [client] out\index.html is missing - run a build first.
  goto fail
)

echo.
echo   [client] Serving out/ at http://127.0.0.1:8125
echo   [client] Routing mirrors Cloudflare Pages: /case/maison -^> case/maison.html
echo   [client] Stop: Ctrl+C
echo.

start "" /min node "scripts\open-when-ready.mjs" 8125

call npm run serve:out
if errorlevel 1 goto fail
goto end

:fail
echo.
echo   [client] Failed - see the error above.
pause
exit /b 1

:end
pause
