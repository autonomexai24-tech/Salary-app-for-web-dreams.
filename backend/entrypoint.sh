#!/bin/sh
set -e

echo "⏳ Running Prisma db push to sync schema..."
npx prisma db push --skip-generate --accept-data-loss 2>&1 || {
  echo "⚠️  Prisma db push failed, retrying in 5s..."
  sleep 5
  npx prisma db push --skip-generate --accept-data-loss
}
echo "✅ Database schema synced"

echo "🚀 Starting server..."
exec node dist/index.js
