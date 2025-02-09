import type { Metadata } from "next";
import "./globals.css";
import "../styles/main.scss"
import Header from "./layout/header/Header";
import ToasterProvider from "./providers/ToastProvider";

export const metadata: Metadata = {
  title: "Teamo",
  description: "Teamo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='body'>
        <ToasterProvider />
        <Header/>
        <main className='main'>
            {children}
        </main>
      </body>
    </html>
  );
}
