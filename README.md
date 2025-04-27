# 🛠 Favorites Program
Based upon the tutorial from [Solana Developer Bootcamp](https://github.com/solana-developers/developer-bootcamp-2024)

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

Verify your local environment with:
```bash
echo "Solana CLI: $(solana -V)\nAnchor: $(anchor --version)\nNode: $(node --version)\nRust: $(rustc -V)"
```

This repository was tested with:
```
Solana CLI: solana-cli 2.2.6 (src:e5cdee7c; feat:4066693973, client:Agave)
Anchor: anchor-cli 0.31.1
Node: v23.11.0
Rust: rustc 1.86.0 (05f9846f8 2025-03-31)
```

### Setup
```bash
git clone https://github.com/TimBossuyt/solana-dev-bootcamp-favorites.git
cd favorites
yarn install
anchor build
anchor test
```

Deploy if you're ready:
```bash
anchor deploy
```

## 🚀 Deployed Program IDs
| Network  | Program ID |
|:---------|:-----------|
| Devnet   | [HhQUdUs3NXAgUu8oB3B2SGQ31PYkJrgN8m4v5Af1rX58](https://explorer.solana.com/address/HhQUdUs3NXAgUu8oB3B2SGQ31PYkJrgN8m4v5Af1rX58?cluster=devnet) |



