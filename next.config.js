/** @type {import('next').NextConfig} */

const nextConfig = {
     async rewrites() {
        return [
          {
            source: '/api/v1/devices/:path*',
            destination: 'http://localhost:8080/api/v1/devices/:path*',
          },
        ]
      },
      output: "standalone"
}

module.exports = nextConfig
