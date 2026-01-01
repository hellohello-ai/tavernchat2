import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TavernChat",
  description: "A cozy fantasy tavern for character-driven AI chats."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="ambient" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
