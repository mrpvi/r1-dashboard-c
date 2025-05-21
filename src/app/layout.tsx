import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toast } from "@/components/shared/molecules/Toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/authConfig";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Panel",
  description: "Panel for managing your Article",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className={inter.variable}>
      <SessionProvider session={session}>
      <body>
        {children}
        <Toast />
      </body>
      </SessionProvider>
    </html>
  );
}
