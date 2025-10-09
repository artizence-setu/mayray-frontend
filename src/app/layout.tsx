import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Poppins, Lily_Script_One } from "next/font/google";
import { DownloadsProvider } from "./components/downloads-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const lily = Lily_Script_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lily",
});

export const metadata: Metadata = {
  title: "Your App Name",
  description: "project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lily.variable}`}>
      <body className="antialiased font-body">
            <DownloadsProvider>

        {children}
        <ToastContainer />
          </DownloadsProvider>
      </body>
    </html>
  );
}
