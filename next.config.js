module.exports = {
  reactStrictMode: true,
  headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.gstatic.com"
          }
        ]
      }
    ]
  }
}