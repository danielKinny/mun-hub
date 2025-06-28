import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "./context/sessionContext";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import AppWrapper from "@/components/AppWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
  style: ["normal", "italic"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "mun-hub",
  description: "ooga booga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`bg-black antialiased ${poppins.className}`}>
        {/* entire thingy is wrapped with session provider */}
        <SessionProvider>
          <AppWrapper>
            {children}
          </AppWrapper>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
