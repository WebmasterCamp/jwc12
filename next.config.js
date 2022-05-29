const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  const env = {
    BASE_URL: (() => {
      if (isDev) return 'http://localhost:3000'
      if (isProd) {
        return 'https://12.jwc.in.th'
      }
      if (isStaging) return 'http://12-staging.jwc.in.th'
      return 'BASE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    MODE: (() => {
      if (isDev) {
        return 'DEVELOPMENT'
      }
      if (isProd) {
        return 'PRODUCTION'
      }
      if (isStaging) {
        return 'STAGING'
      }
      return 'MODE:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
  }

  return {
    reactStrictMode: true,
    env,
  }
}

module.exports = nextConfig
