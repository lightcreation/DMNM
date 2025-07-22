# 📡 Decentralized Mobile Network Marketplace (DMNM)

A Web3-based telecom platform that decentralizes mobile data access and enables peer-to-peer leasing of bandwidth using smart contracts built in **Clarity** (Stacks blockchain).

---

## 🚀 Overview

**DMNM** allows users to rent, share, and monetize mobile data or bandwidth without relying on centralized telecom providers. It connects bandwidth providers (nodes) with mobile users via secure Clarity smart contracts. The protocol ensures fair payment, service guarantees, and decentralized governance.

---

## 🧩 Features

- ✅ Peer-to-peer mobile data leasing
- 📶 Decentralized node registration and verification
- 💰 Token-based payment, staking, and rewards
- 🌍 Roaming settlement between network zones
- 🛡️ Escrow-based fraud protection
- 🗳️ DAO governance for protocol upgrades

---

## 📜 Smart Contracts

The system includes 10 Clarity contracts:

| Contract | Description |
|---------|-------------|
| `user-registry.clar` | Registers users, optional KYC, manages public keys |
| `provider-registry.clar` | Verifies node providers and infra contributors |
| `bandwidth-lease.clar` | Handles P2P leasing agreements (price, duration, terms) |
| `escrow.clar` | Holds payments in escrow until service is verified |
| `reputation.clar` | Stores on-chain feedback and ratings |
| `roaming-settlement.clar` | Tracks bandwidth usage and settles roaming micropayments |
| `dmnm-token.clar` | Utility ERC-20-like fungible token for payments & staking |
| `dispute-resolution.clar` | Handles arbitration and challenge mechanisms |
| `staking.clar` | Manages staking, slashing, and rewards for providers |
| `governance.clar` | Enables community voting and protocol changes (DAO) |

---

## 🏗️ Tech Stack

- **Blockchain**: Stacks (Clarity smart contracts)
- **Frontend**: React + Stacks.js
- **Storage**: Gaia for off-chain metadata (optional)
- **Oracles**: Chainlink (off-chain bandwidth verification via adapter)
- **Wallet**: Hiro Wallet for STX and DMNM token

---

## ⚙️ Installation

```bash
git clone https://github.com/your-org/dmnm.git
cd dmnm

# Install Clarity development tools
npm install -g @stacks/cli

# Run tests
clarinet test
