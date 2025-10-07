import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
  import { ToastContainer } from 'react-toastify';

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], 
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Modern UI with Poppins + Inter fonts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased font-body  cz-shortcut-listen="true"`}
      >
        {children}
                <ToastContainer />

      </body>
    </html>
  );
}
