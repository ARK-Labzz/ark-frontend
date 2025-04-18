import type React from "react";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/sidebar";
import Header from "@/components/header";
import { WalletProvider } from "@/hooks/use-wallet";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import DynamicProvider from "@/components/providers/dynamic-lab";
import QueryProvider from "@/components/providers/query-provider";
import WagmiConnector from "@/components/providers/wagmi-connector";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable | Launch Stablecoins",
  description: "Create and manage stablecoins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <DynamicProvider>
        <body className={`${sora.className} bg-[#051016] text-white`}>
          <QueryProvider>
            <WagmiConnector>
              <SidebarProvider defaultOpen={false}>
                <WalletProvider>
                  <AppSidebar />
                  <div className="relative flex min-h-screen flex-col flex-1">
                    <Header />
                    <main className="flex-1 p-4 pt-30 mt-10 md:mt-0 md:pt-4">
                      {children}
                      <Toaster />
                    </main>
                  </div>
                </WalletProvider>
              </SidebarProvider>
            </WagmiConnector>
          </QueryProvider>
        </body>
      </DynamicProvider>
    </html>
  );
}
