#!/usr/bin/env bash
set -euo pipefail

echo "==> Installing pnpm"
npm install -g pnpm@latest

echo "==> Installing dependencies"
pnpm install --frozen-lockfile

echo "==> Running API codegen"
pnpm --filter @workspace/api-spec run codegen

echo "==> Building frontend"
NODE_ENV=production BASE_PATH=/ pnpm --filter @workspace/portfolio run build

echo "==> Building API server"
pnpm --filter @workspace/api-server run build

echo "==> Running database migrations"
pnpm --filter @workspace/db run push

echo "==> Build complete"
