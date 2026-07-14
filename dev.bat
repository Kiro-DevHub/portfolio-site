@echo off
rem === Kiro.dev - development mode (Next dev server, hot reload) ===
rem
rem KEEP THIS FILE PURE ASCII. cmd.exe parses .bat using the OEM codepage
rem (866 here), not UTF-8: Cyrillic bytes corrupt the parser itself - they split
rem lines and turned "echo" into "cho". Comments and messages stay English.
rem
rem chcp 65001 is safe precisely because this file is ASCII - there is nothing
rem here to mis-parse. It is for the CHILD processes: the npm scripts print
rem Russian in UTF-8, which turns to mojibake in an 866 console.
chcp 65001 >nul

title Kiro.dev - dev
cd /d "%~dp0"

if not exist "node_modules\" (
  echo [dev] node_modules is missing, installing dependencies...
  call npm install
  if errorlevel 1 goto fail
)

echo.
echo   [dev] Starting Next dev server with hot reload.
echo   [dev] URL: http://127.0.0.1:3000   (127.0.0.1, NOT localhost - see CLAUDE.md)
echo   [dev] The browser tab opens once the server actually answers.
echo   [dev] Stop: Ctrl+C
echo.

rem The dev server blocks this window, so the tab opener waits in its own.
start "" /min node "scripts\open-when-ready.mjs" 3000

call npm run dev
if errorlevel 1 goto fail
goto end

:fail
echo.
echo   [dev] Failed to start - see the error above.
pause
exit /b 1

:end
pause
