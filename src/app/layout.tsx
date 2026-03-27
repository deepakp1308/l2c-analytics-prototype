"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import { QBOSidebar } from "@/components/QBOSidebar";
import { QBOTopBar } from "@/components/QBOTopBar";
import { IntuitAssistPanel } from "@/components/IntuitAssistPanel";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [assistOpen, setAssistOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>();

  // Listen for chip clicks from page components
  useEffect(() => {
    function handler(e: Event) {
      const q = (e as CustomEvent).detail;
      setInitialQuestion(q);
      setAssistOpen(true);
    }
    window.addEventListener("open-intuit-intelligence", handler);
    return () => window.removeEventListener("open-intuit-intelligence", handler);
  }, []);

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <title>QuickBooks Online</title>
        <meta name="description" content="L2C Analytics — QuickBooks Online" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">
        <div className="flex h-screen overflow-hidden w-full">
          <QBOSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <QBOTopBar onToggleAssist={() => { setInitialQuestion(undefined); setAssistOpen(!assistOpen); }} />
            <main className="flex-1 overflow-y-auto bg-white pb-12">
              {children}
            </main>
          </div>
        </div>
        <IntuitAssistPanel open={assistOpen} onClose={() => { setAssistOpen(false); setInitialQuestion(undefined); }} initialQuestion={initialQuestion} />
      </body>
    </html>
  );
}
