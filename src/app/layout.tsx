import type { Metadata } from "next";
import { Noto_Sans_Lao_Looped } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "@/providers/ReduxProviders";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";

const lao = Noto_Sans_Lao_Looped({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Sabaifin",
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
          <body
            className={`${lao.className} antialiased`}
            suppressHydrationWarning
          >
            {children}
          </body>
        </html>
      </ReactQueryClientProvider>
    </ReduxProviders>

  );
}
