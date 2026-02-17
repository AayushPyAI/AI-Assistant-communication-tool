import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";
import SidebarMainContent from "./contexts/SidebarMainContent";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Communication Assistant",
  description: "Real-time AI assistant for client calls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white h-full">
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-white h-full overflow-hidden`}
      >
        <SidebarProvider>
          <div className="flex h-screen">
            <Sidebar />
            <SidebarMainContent>{children}</SidebarMainContent>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
