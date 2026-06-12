import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stoyan Stoyanov | Level Designer",
  description:
    "Portfolio of Stoyan Stoyanov, a level designer from Bulgaria available for freelance projects.",
  openGraph: {
    title: "Stoyan Stoyanov | Portfolio",
    description:
      "Selected level design projects, commissions, and contact information for Stoyan Stoyanov.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="relative flex min-h-full flex-col overflow-x-hidden">
        <Navbar />
        <div className="relative z-10 flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
