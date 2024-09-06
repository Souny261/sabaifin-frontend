import type { Metadata } from "next";
import { Noto_Sans_Lao } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "../redux/providers";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
const inter = Noto_Sans_Lao({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Sabai Financial",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProviders>
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
        <body className={inter.className}>{children}</body>
        <GoogleAnalytics gaId="G-6KQ5WZPE0T" />
      </html>
    </ReduxProviders>
  );
}
