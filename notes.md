
Features

The app has been hosted on [netlify](https://app.netlify.com/sites/fetchly-hydra/overview)

1. Simple Contact form
  - is available at `src/components/contact/ContactForm.client.jsx`
  - has form validations 
  - send email through sendgrid once it gets submitted

2. Sendgrid
- makes use of [netlify/functions](https://www.netlify.com/products/functions/) to send the mail (netlify/functions/sendmail.js)
- Github link to the function [repo](https://github.com/fetchly/hydra-lamda)

3. Metafields/ CMS
- we need to expose the metafields to the shopify api and retrive it
- an example of product metafields is at (src/routes/metafields/ProductMetafields.server.jsx)
- [resource](https://allthingscommerce.com/hydrogen-how-to-expose-shopify-metafields-to-storefront-api)

4. i18n translation
- for frontend part we are using the react-i18next package (TranslationProvider.client.js)
- use the dropdown in the footer to change the language
- for server, shopify api transaltion we are using useLocalization hook from shopify/hydrogen
- [resources](https://shopify.dev/custom-storefronts/hydrogen/internationalization)

5. Google analytics
- [resources](https://shopify.dev/custom-storefronts/hydrogen/analytics)

6. Error Tracking with Sentry(entry-cient.jsx)