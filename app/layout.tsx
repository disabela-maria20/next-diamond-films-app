/* eslint-disable prettier/prettier */
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import '@/styles/sass/globals.scss'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'

import { Footer, Location } from '@/components/molecules'
import { Header } from '@/components/organisms'

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
        <Header>
          <Script dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3920910,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}} />
        </Header>
        {children}
        <Location />
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-ND454GP5" />
      <GoogleAnalytics gaId="G-DRBHT7HM35" />
    </html>
  )
}
