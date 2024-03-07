<<<<<<< HEAD
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
=======
/* eslint-disable prettier/prettier */
import { GoogleAnalytics } from '@next/third-parties/google'
>>>>>>> 21bb6e3ca79656f60f28a426126775e0fab473a9
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import '@/styles/sass/globals.scss'
import { Footer } from '@/components/molecules'
import { Header } from '@/components/organisms'
import Providers from '@/utils/providers'
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Diamond Films'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <Header />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-ND454GP5" />
      <GoogleAnalytics gaId="G-DRBHT7HM35" />
    </html>
  )
}
