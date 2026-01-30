export const metadata = {
  title: 'Basma ID - Digital Rights',
  description: 'Secure your creative work on the blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
