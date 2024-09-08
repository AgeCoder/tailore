import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import TopNavBar from "@/components/Navbar/TopNavBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonali Fashion",
  description: "Sonali Fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* <TopNavBar /> */}
            {children}
          </ThemeProvider>
          <Toaster richColors position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
