import { LoadingProvider } from "@/providers/LoadingProvider";
import ToasterProvider from "@/providers/ToastProvider";
import type { Metadata } from "next";
import "../styles/main.scss";
import "./globals.css";
import Footer from "./layout/footer/Footer";
import Header from "./layout/header/Header";
import MainWrapper from "./MainWrapper";


export const metadata: Metadata = {
  title: "Teamo",
  description: "Teamo",
  icons: {
    icon: "/icon.png",
  }
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
