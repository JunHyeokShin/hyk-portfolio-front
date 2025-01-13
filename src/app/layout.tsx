import CustomLenis from "@/components/CustomLenis";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const HelveticaNeueCyr = localFont({
  src: [
    { path: "../../public/fonts/HelveticaNeueCyr-Thin.ttf", weight: "100" },
    { path: "../../public/fonts/HelveticaNeueCyr-Thin-Italic.ttf", weight: "100", style: "italic" },
    { path: "../../public/fonts/HelveticaNeueCyr-Light.ttf", weight: "300" },
    { path: "../../public/fonts/HelveticaNeueCyr-Light-Italic.ttf", weight: "300", style: "italic" },
    { path: "../../public/fonts/HelveticaNeueCyr-Roman.ttf", weight: "400" },
    { path: "../../public/fonts/HelveticaNeueCyr-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/HelveticaNeueCyr-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/HelveticaNeueCyr-Medium-Italic.ttf", weight: "500", style: "italic" },
    { path: "../../public/fonts/HelveticaNeueCyr-Bold.ttf", weight: "700" },
    { path: "../../public/fonts/HelveticaNeueCyr-Bold-Italic.ttf", weight: "700", style: "italic" },
    { path: "../../public/fonts/HelveticaNeueCyr-Black.ttf", weight: "900" },
    { path: "../../public/fonts/HelveticaNeueCyr-Black-Italic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-helvetica-neue-cyr",
});

const JetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const SegoeUISymbol = localFont({
  src: "../../public/fonts/SegoeUISymbol.ttf",
  variable: "--font-segoe-ui-symbol",
});

export const metadata: Metadata = {
  title: "HYK Portfolio",
  description: "HYK's Portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomLenis root>
      <html lang="en">
        <body className={`${HelveticaNeueCyr.variable} ${JetBrainsMono.variable} ${Pretendard.variable} ${SegoeUISymbol.variable}`}>{children}</body>
      </html>
    </CustomLenis>
  );
}
