import type { Metadata } from "next";
import "./globals.css";
import "../styles/main.scss"
import Navbar from "./nav/NavBar";

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
      <body>
        <Navbar/>
        <main className='container mx-auto px-5 pt-10'>
            {children}
        </main>
      </body>
    </html>
  );
}
