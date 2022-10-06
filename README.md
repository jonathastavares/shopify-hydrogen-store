# Fetchly Hydra Core

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)

[Run this template in JavaScript on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/dist/templates/demo-store-js?file=package.json)

[Run this template in JavaScript on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/dist/templates/demo-store-js?file=package.json)

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher
- Yarn

To create a new Hydrogen app, run:

```bash
yarn init @shopify/hydrogen
```

## Running the dev server

Then `cd` into the new directory and run:

```bash
yarn install
yarn run dev
```

Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!

## Building for production

```bash
yarn run build
```

## Previewing a production build

To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `yarn run preview`:

```bash
yarn run build
yarn run preview
```
