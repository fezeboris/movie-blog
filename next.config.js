/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org']
  },
// i18n: {
//   locales: [
//     'en', 'fr'
//   ],
//   defaultLocale: 'en'
// }
i18n}

module.exports = nextConfig
