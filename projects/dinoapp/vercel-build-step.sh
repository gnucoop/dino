#!/bin/bash

# Vercel "Ignored Build Step". Exit 1 => build proceeds, exit 0 => build skipped.

echo "VERCEL_ENV: $VERCEL_ENV"

# Only the production branch can deploy; previews are always skipped.
if [[ "$VERCEL_ENV" != "production" ]]; then
  echo "🛑 - $VERCEL_ENV (not production) — build cancelled"
  exit 0
fi

# In production, deploy ONLY release commits produced by `yarn prepare-release`,
# so ordinary PR merges into dev do NOT trigger a deploy. The release commit
# message is the marker — robust even in Vercel's shallow clone (unlike tags,
# which may not be fetched).
MSG=$(git log -1 --pretty=%s)
if echo "$MSG" | grep -qE '^(build: Manifest and worker sw_version upgraded to [0-9]+|release: cut the v)'; then
  echo "✅ - release commit: $MSG — build can proceed"
  exit 1
fi

echo "🛑 - not a release commit ($MSG) — build cancelled"
exit 0
