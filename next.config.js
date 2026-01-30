/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  images: { unoptimized: true },
  trailingSlash: true, // يضمن عمل الروابط بشكل صحيح على GitHub Pages
}

module.exports = nextConfig
