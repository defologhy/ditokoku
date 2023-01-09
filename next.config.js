/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_NAME: "DITOKOKU",
    REACT_APP_VERSION: "001.001.001",
    REACT_APP_PORT: "3000",
    REACT_APP_LANGUAGE: "INDONESIA",
    REACT_APP_TIMEZONE: "Asia/Jakarta",
    REACT_APP_URL: "http://localhost:3000",
    REACT_APP_RESELLER_API_BASE_URL: "http://localhost:2694",
    REACT_APP_RESELLER_API_VERSION_URL: "/api/v1",
    REACT_APP_COOKIE_EXPIRES: "5000"
  },
  reactStrictMode: true,
}

module.exports = nextConfig
