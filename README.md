# Il Dolce — Artisan Bakery Website

A static frontend for **Il Dolce**, featuring a menu of 15 tart flavours and a delivery ordering flow. Built to be extended with a backend database for orders and financial tracking.

## What's included

- **Menu** — 15 tart flavours across Classic, Fruit, Chocolate, and Seasonal categories
- **Cart** — Add/remove tarts with quantity controls
- **Delivery ordering** — Contact info, address, date/time slot selection, order summary
- **Local storage** — Orders saved in the browser for now (ready to swap for an API)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

The `dist/` folder contains static files you can deploy to Netlify, Vercel, GitHub Pages, or any static host.

## Project structure

```
src/
├── components/     # UI components (Header, Menu, OrderSection, etc.)
├── data/tarts.ts   # 15 tart definitions — edit names, prices, descriptions here
├── services/       # Order logic — replace localStorage with API calls later
├── types/          # TypeScript interfaces shared across the app
└── styles/         # Global CSS
```

## Next steps (database integration)

When you're ready to connect a backend:

1. **Orders** — Replace `orderService.save()` in `src/services/orders.ts` with a `POST /api/orders` call
2. **Financial data** — Add an admin section that reads from your database (revenue, order history, inventory)
3. **Suggested stack** — Supabase or Firebase for a quick start; PostgreSQL + Node/Express for full control

Order data is typed in `src/types/index.ts` (`DeliveryOrder`) so your API schema can mirror it directly.

## Customisation

- Edit tart names, prices, and descriptions in `src/data/tarts.ts`
- Update contact info and hours in `src/components/Footer.tsx`
- Adjust colours and fonts in `src/styles/global.css` (`:root` variables)
