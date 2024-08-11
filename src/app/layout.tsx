import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import OpenAiAssistant from "./components/openAiAssistant";
import BedrockAiAssistant from "./components/bedrockAiAssistant";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="relative max-w-7xl mx-auto  min-h-screen"
        >
          <Navbar />
          <OpenAiAssistant />
          {/* <BedrockAiAssistant /> */}
          {/* <Chatbox /> */}
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
