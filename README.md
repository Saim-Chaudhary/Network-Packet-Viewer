# Packet Activity Dashboard

Clean, minimal SOC-style dashboard built with React + Vite. It includes live search, summary metrics, and protocol breakdown analytics for a packet dataset.

## Features

- Live search by protocol, source IP, or destination IP
- Summary cards for total, success, and failed packets
- Protocol breakdown cards with proportional bars
- Responsive layout and refined data-table styling

## Tech Stack

- React
- Vite
- CSS (no UI framework)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Data

Packet data lives in `src/data/Packet.js`. Update that file to add or adjust protocols and status values.
