import './globals.css'; // تأكد من وجود ملف css أو احذف هذا السطر

export const metadata = {
  title: 'Basma ID',
  description: 'Digital Rights Secured',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
