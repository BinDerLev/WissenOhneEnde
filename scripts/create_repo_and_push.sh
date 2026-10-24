#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/create_repo_and_push.sh [repo-name] [remote-name] [branch]
# Example: ./scripts/create_repo_and_push.sh my-portfolio origin main

REPO_NAME="${1:-home-website}"
REMOTE_NAME="${2:-origin}"
BRANCH="${3:-main}"

ROOT_DIR="$(pwd)"

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: GitHub CLI (gh) not found. Install it from https://cli.github.com/ and run 'gh auth login' to authenticate."
  exit 1
fi

if [ -d .git ]; then
  echo "Found existing git repo."
else
  echo "Initializing new git repository..."
  git init
  git add --all
  git commit -m "Initial commit"
fi

echo "Checking for existing GitHub repository named '$REPO_NAME'..."
if gh repo view "$REPO_NAME" >/dev/null 2>&1; then
  echo "Repository exists on GitHub. Attaching remote '$REMOTE_NAME'."
  gh repo view "$REPO_NAME" --json sshUrl --jq .sshUrl | xargs -I {} git remote add -f "$REMOTE_NAME" {} || true
else
  echo "Creating repository '$REPO_NAME' on GitHub (public)..."
  gh repo create "$REPO_NAME" --public --source=. --remote="$REMOTE_NAME" --push
fi

echo "Ensure branch is '$BRANCH' and push..."
git branch -M "$BRANCH"
git push -u "$REMOTE_NAME" "$BRANCH"

echo "Done. If the repository is public, the GitHub Actions workflow will run and deploy to GitHub Pages on push to '$BRANCH'."
echo "Page URL (usually): https://$(gh api user --jq .login).github.io/$REPO_NAME/"

