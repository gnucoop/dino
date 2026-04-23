import {DinoManifest} from 'src/app/custom-manifest-interface';

export const webManifest: (
  name: string,
  short_name: string,
  start_url: string,
  pwa_folder: string,
) => DinoManifest = (name: string, short_name: string, start_url: string, pwa_folder: string) => {
  return {
    name,
    short_name,
    start_url,
    'icons': [
      {
        'src': `${start_url}assets/icons/pwa-icons/${pwa_folder}/72.png`,
        'sizes': '72x72',
        'type': 'image/png',
        'purpose': 'any',
      },
      {
        'src': `${start_url}assets/icons/pwa-icons/${pwa_folder}/96.png`,
        'sizes': '96x96',
        'type': 'image/png',
        'purpose': 'any',
      },
      {
        'src': `${start_url}assets/icons/pwa-icons/${pwa_folder}/128.png`,
        'sizes': '128x128',
        'type': 'image/png',
        'purpose': 'any',
      },
      {
        'src': `${start_url}assets/icons/pwa-icons/${pwa_folder}/144.png`,
        'sizes': '144x144',
        'type': 'image/png',
        'purpose': 'any',
      },
      {
        'src': `${start_url}assets/icons/pwa-icons/${pwa_folder}/152.png`,
        'sizes': '152x152',
        'type': 'image/png',
        'purpose': 'any',
      },
      {
        'src': `${start_url}assets/icons/pwa-icons/${pwa_folder}/192.png`,
        'sizes': '192x192',
        'type': 'image/png',
        'purpose': 'any',
      },
      {
        'src': `${start_url}assets/icons/pwa-icons/${pwa_folder}/512.png`,
        'sizes': '512x512',
        'type': 'image/png',
        'purpose': 'any',
      },
    ],
  };
};
