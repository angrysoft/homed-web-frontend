/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
       return [
         {
           source: '/api/v1/:path*',
           destination: 'http://localhost:8080/api/v1/:path*',
         },
         {
           source: '/oauth2/authorization/google',
           destination: 'http://localhost:8080//oauth2/authorization/google',
         },
       ]
     },
     output: "standalone"
}

module.exports = nextConfig