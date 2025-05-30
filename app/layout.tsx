import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "./context/sessionContext";
import { Toaster } from "sonner";
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
      <body className="bg-black antialiased">
        {/* entire thingy is wrapped with session provider */}
        <SessionProvider>
          <main>
            {children}
          </main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
