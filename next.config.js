/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src *; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.gstatic.com; connect-src *; img-src * data:; style-src 'self' 'unsafe-inline' *"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig