import type { Metadata } from "next";
import "./globals.css";
import "../styles/main.scss";
import Header from "./layout/header/Header";
import ToasterProvider from "@/providers/ToastProvider";
import Footer from "./layout/footer/Footer";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { headers } from "next/headers";
import MainWrapper from "./MainWrapper";

export const metadata: Metadata = {
  title: "Teamo",
  description: "Teamo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body">
        <ToasterProvider />
        <LoadingProvider>
          <Header />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
