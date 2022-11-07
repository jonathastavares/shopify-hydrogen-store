import {Suspense} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {TranslationProvider} from './components/TranslationProvider.client';

import {
  FileRoutes,
  PerformanceMetrics,
  PerformanceMetricsDebug,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
  CartProvider,
} from '@shopify/hydrogen';
import {HeaderFallback, EventsListener} from '~/components';
import {DefaultSeo, NotFound} from '~/components/index.server';

function App({request}) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  return (
    <Suspense fallback={<HeaderFallback isHome={isHome} />}>
      <EventsListener />
      <ShopifyProvider countryCode={countryCode}>
        <CartProvider countryCode={countryCode}>
          <Suspense>
            <DefaultSeo />
          </Suspense>
          <TranslationProvider>
            <Router>
              <FileRoutes
                basePath={countryCode ? `/${countryCode}/` : undefined}
              />
              <Route path="*" page={<NotFound />} />
            </Router>
          </TranslationProvider>
        </CartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
        <ShopifyAnalytics cookieDomain="hydrogen.shop" />
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
