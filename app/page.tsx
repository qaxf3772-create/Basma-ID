/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // هذا السطر مهم جداً إذا كان اسم المستودع يظهر في الرابط
  basePath: '/Basma-ID', 
}
module.exports = nextConfig
