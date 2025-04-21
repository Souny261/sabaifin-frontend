import type { Metadata } from "next";
import { Noto_Sans_Lao_Looped } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "@/providers/ReduxProviders";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
const lao = Noto_Sans_Lao_Looped({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "SabaiFin",
  description: "Financial calculator in Laos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProviders>
      <ReactQueryClientProvider>
        <html lang="en">
          <head>
            {/* <!-- Google tag (gtag.js) --> */}
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6KQ5WZPE0T"></Script>
            <Script id="google-analytics">
              {
                `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6KQ5WZPE0T');
            `
              }
            </Script>
          </head>
          <body
            className={`${lao.className} antialiased`}
            suppressHydrationWarning
          >
            {children}
          </body>
          <GoogleAnalytics gaId="G-6KQ5WZPE0T" />
        </html>
      </ReactQueryClientProvider>
    </ReduxProviders>

  );
}
