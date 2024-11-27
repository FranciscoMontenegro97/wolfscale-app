import sass from 'sass';

export default {
  implementation: sass,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api']
  }
} as const;