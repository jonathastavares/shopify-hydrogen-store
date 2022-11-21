import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';
import renderHydrogen from '@shopify/hydrogen/entry-client';

const ClientWrapper = (props) => props.children;

Sentry.init({
  // TODO: add the actual sentry dsn key eg:
  // dsn: 'https://14965f0bf2484458be2db1d4eda6d7c7@o1304006.ingest.sentry.io/4504196690345984',
  dsn: '',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.2,
});

export default renderHydrogen(ClientWrapper);
