import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/root/navbar";
import Footer from "@/components/root/footer";

const font = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className}`}>
          <Navbar />
          <div className="flex flex-col min-h-[calc(100vh-4rem-1px)]">
            <div className="flex flex-1 flex-col h-full">
              <Provider>
                {children}
                <Toaster />
              </Provider>
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
