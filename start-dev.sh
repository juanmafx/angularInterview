#!/usr/bin/env bash
set -euo pipefail

export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1090
. "$NVM_DIR/nvm.sh"
nvm use >/dev/null

npm start -- --host 127.0.0.1 --port 4300
