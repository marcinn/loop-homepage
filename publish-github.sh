#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/marcinn/loop-homepage.git"
BRANCH="master"

if [ ! -d .git ]; then
  git init -b "$BRANCH"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

git add -A
if ! git diff --cached --quiet; then
  git commit -m "Initial LOOP Hugo site"
fi

git push -u origin "$BRANCH"
