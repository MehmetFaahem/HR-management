/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  cssModules: true,
  webpack: config => {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

export default config
