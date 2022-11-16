import Analytics from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';
import {useEffect} from 'react';
let init = false;

export function GoogleTagManager() {
  useEffect(() => {
    if (!init) {
      init = true;
      Analytics({
        app: 'hydrogen-app',
        plugins: [
          googleTagManager({
            containerId: 'TAG_ID',
          }),
        ],
      });
    }
  });
  return null;
}
