# 🛠 Favorites Program

This is a Solana smart contract built with Anchor that allows users to save their favorite number, color, and hobbies.

## 📦 Program Overview

- Users can **set** their favorites
- Users can **view** (read) their favorites
- Each user has a **separate PDA** storing their data

Built with [Anchor](https://book.anchor-lang.com/).

## 🛠 Local Development

Make sure you have installed:
- [Rust](https://rustup.rs/)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor CLI](https://book.anchor-lang.com/getting_started/installation.html)
- [Node.js + Yarn](https://classic.yarnpkg.com/en/docs/install/) (optional: or use npm)

### Setup
```bash
git clone https://github.com/TimBossuyt/solana-dev-bootcamp-favorites.git
cd favorites
yarn install
anchor build
anchor test
```

## 🚀 Deployed Program IDs
Network | Program ID
Localnet | HhQUdUs3NXAgUu8oB3B2SGQ31PYkJrgN8m4v5Af1rX58
Devnet | HhQUdUs3NXAgUu8oB3B2SGQ31PYkJrgN8m4v5Af1rX58


