import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const helveticaNeue = localFont({
  src: [
    { path: "./HelveticaNeueCyr-UltraLight.woff2", weight: "100", style: "normal" },
    { path: "./HelveticaNeueCyr-UltraLightItalic.woff2", weight: "100", style: "italic" },
    { path: "./HelveticaNeueCyr-Thin.woff2", weight: "200", style: "normal" },
    { path: "./HelveticaNeueCyr-ThinItalic.woff2", weight: "200", style: "italic" },
    { path: "./HelveticaNeueCyr-Light.woff2", weight: "300", style: "normal" },
    { path: "./HelveticaNeueCyr-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "./HelveticaNeueCyr-Roman.woff2", weight: "400", style: "normal" },
    { path: "./HelveticaNeueCyr-Italic.woff2", weight: "400", style: "italic" },
    { path: "./HelveticaNeueCyr-Medium.woff2", weight: "500", style: "normal" },
    { path: "./HelveticaNeueCyr-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "./HelveticaNeueCyr-Bold.woff2", weight: "700", style: "normal" },
    { path: "./HelveticaNeueCyr-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "./HelveticaNeueCyr-Heavy.woff2", weight: "800", style: "normal" },
    { path: "./HelveticaNeueCyr-HeavyItalic.woff2", weight: "800", style: "italic" },
    { path: "./HelveticaNeueCyr-Black.woff2", weight: "900", style: "normal" },
    { path: "./HelveticaNeueCyr-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
  preload: false,
  variable: "--font-helvetica-neue",
});

export const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  weight: "45 930",
  variable: "--font-pretendard",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains-mono",
});
