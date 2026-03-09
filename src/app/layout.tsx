import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./component/Provider";
import UserContextProvider from "./context/UserContextProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeCraft — AI-Powered Resume Builder",
  description: "Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Choose from 5 templates, get AI writing assistance, and download as PDF.",
  keywords: ["resume builder", "AI resume", "CV maker", "ATS friendly", "professional resume"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <UserContextProvider>
            {children}
            <Toaster 
              position="bottom-right" 
              richColors 
              closeButton
              toastOptions={{
                style: {
                  borderRadius: '12px',
                },
              }}
            />
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  );
}
