#!/bin/bash
# PreToolUse-хук: блокирует опасные git-команды до выполнения.
# JSON со stdin парсим через node (jq на Windows может отсутствовать).

INPUT=$(cat)
COMMAND=$(printf '%s' "$INPUT" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{process.stdout.write(((JSON.parse(d).tool_input)||{}).command||"")}catch(e){process.stdout.write("")}})')

DANGEROUS_PATTERNS=(
  "git push"
  "git reset --hard"
  "git clean -fd"
  "git clean -f"
  "git branch -D"
  "git checkout \."
  "git restore \."
  "push --force"
  "reset --hard"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: '$COMMAND' matches dangerous pattern '$pattern'. The user has prevented you from doing this." >&2
    exit 2
  fi
done

exit 0
