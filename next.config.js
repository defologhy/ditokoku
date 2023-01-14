// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   env: {
//     REACT_APP_NAME: "DITOKOKU",
//     REACT_APP_VERSION: "001.001.001",
//     REACT_APP_PORT: "3000",
//     REACT_APP_LANGUAGE: "INDONESIA",
//     REACT_APP_TIMEZONE: "Asia/Jakarta",
//     // REACT_APP_URL: "http://localhost:3000",
//     // REACT_APP_RESELLER_API_BASE_URL: "http://localhost:2694",
//     REACT_APP_URL: "https://ditokoku.vercel.app/",
//     REACT_APP_RESELLER_API_BASE_URL: "https://api-ditokoku.herokuapp.com",
//     REACT_APP_RESELLER_API_VERSION_URL: "/api/v1",
//     REACT_APP_COOKIE_EXPIRES: "5000"
//   },
//   reactStrictMode: true,
// }

// on vercel
// module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_NAME: process.env.REACT_APP_NAME,
    REACT_APP_VERSION: process.env.REACT_APP_VERSION,
    REACT_APP_PORT: process.env.REACT_APP_PORT,
    REACT_APP_LANGUAGE: process.env.REACT_APP_LANGUAGE,
    REACT_APP_TIMEZONE: process.env.REACT_APP_TIMEZONE,
    // REACT_APP_URL: "http://localhost:3000",
    // REACT_APP_RESELLER_API_BASE_URL: "http://localhost:2694",
    REACT_APP_URL: process.env.REACT_APP_URL,
    REACT_APP_DITOKOKU_API_BASE_URL: process.env.REACT_APP_DITOKOKU_API_BASE_URL,
    REACT_APP_DITOKOKU_API_VERSION_URL: process.env.REACT_APP_DITOKOKU_API_VERSION_URL,
    REACT_APP_COOKIE_EXPIRES: process.env.REACT_APP_COOKIE_EXPIRES
  },
  reactStrictMode: true,
}

module.exports = nextConfig
