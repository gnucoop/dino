import {DinoManifest} from 'src/app/custom-manifest-interface';

const startUrl = 'https://exampleDino.netlify.app/';

export const webManifest: DinoManifest = {
  name: 'ExampleDino',
  short_name: 'ExampleDino',
  start_url: startUrl,
  'icons': [
    {
      'src': `${startUrl}assets/icons/pwa-icons/example/72.png`,
      'sizes': '72x72',
      'type': 'image/png',
      'purpose': 'any',
    },
    {
      'src': `${startUrl}assets/icons/pwa-icons/example/96.png`,
      'sizes': '96x96',
      'type': 'image/png',
      'purpose': 'any',
    },
    {
      'src': `${startUrl}assets/icons/pwa-icons/example/128.png`,
      'sizes': '128x128',
      'type': 'image/png',
      'purpose': 'any',
    },
    {
      'src': `${startUrl}assets/icons/pwa-icons/example/144.png`,
      'sizes': '144x144',
      'type': 'image/png',
      'purpose': 'any',
    },
    {
      'src': `${startUrl}assets/icons/pwa-icons/example/152.png`,
      'sizes': '152x152',
      'type': 'image/png',
      'purpose': 'any',
    },
    {
      'src': `${startUrl}assets/icons/pwa-icons/example/192.png`,
      'sizes': '192x192',
      'type': 'image/png',
      'purpose': 'any',
    },
    {
      'src': `${startUrl}assets/icons/pwa-icons/example/512.png`,
      'sizes': '512x512',
      'type': 'image/png',
      'purpose': 'any',
    },
  ],
};
