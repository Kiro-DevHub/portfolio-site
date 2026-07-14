@echo off
rem === Kiro.dev - start everything ===
rem
rem Opens both modes, each in its own window:
rem   dev    - http://127.0.0.1:3000  (hot reload)
rem   client - http://127.0.0.1:8125  (production static from out/)
rem Windows are independent: closing one does not kill the other.
rem KEEP PURE ASCII + chcp 65001 for child output - see the note in dev.bat.
rem
rem The build runs HERE, once, before either window opens. Do not move it into
rem the client window: "next dev" and "next build" share the .next folder, and
rem when they ran at the same time the build lost the race and the client
rem preview never came up.
chcp 65001 >nul

title Kiro.dev - start all
cd /d "%~dp0"

if not exist "node_modules\" (
  echo   [all] node_modules is missing, installing dependencies...
  call npm install
  if errorlevel 1 goto fail
)

echo.
echo   Kiro.dev - starting both modes
echo   ---------------------------------------------
echo    [window 1] dev    : http://127.0.0.1:3000
echo    [window 2] client : http://127.0.0.1:8125
echo.
echo   Building production static first (~20-30s), so the two
echo   windows never run two "next" processes at once...
echo.

call npm run build
if errorlevel 1 goto fail

echo.
echo   [all] Build done. Opening both windows.
echo.

start "Kiro.dev - dev" "%~dp0dev.bat"
start "Kiro.dev - client" "%~dp0client.bat" nobuild

rem Nothing left to do here - the work happens in the two windows above.
exit /b 0

:fail
echo.
echo   [all] Build failed - see the error above. Neither window was opened.
pause
exit /b 1
