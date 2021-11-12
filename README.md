# Polydao Analytics template

Browse key metrics from DAOs and easily add new ones.

## Implementation

Polydao Analytics relies on:

- [polydao-api](https://github.com/karlxlee/polydao-api), an API wrapper that consumes data from the [Covalent API](https://www.covalenthq.com/)
- [Next.js](https://nextjs.org) and [Chakra UI](https://chakra-ui.com/) for the front-end
- [ApexCharts](https://apexcharts.com/) package

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
