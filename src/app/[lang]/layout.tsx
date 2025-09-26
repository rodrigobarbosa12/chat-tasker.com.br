import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Head from 'next/head'
import { ReactNode } from 'react'
import { nextIntl } from 'src/infrastructure/providers'

interface Props {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return nextIntl.locales.map((lang) => ({ lang }))
}

export const metadata: Metadata = {
  title: 'Task Manager AI',
  description: '...',
}

const nunito = Nunito({ display: 'swap', subsets: ['latin'] })

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
