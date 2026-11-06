import type { Metadata } from "next";

import { helveticaNeue, jetbrainsMono, pretendard } from "@/_app/fonts";
import { QueryProvider } from "@/_app/query-client";
import { SmoothScroll } from "@/_app/smooth-scroll";

export const metadata: Metadata = {
  title: {
    default: "HYK Portfolio",
    template: "%s | HYK Portfolio",
  },
  description: "HYK's Portfolio Website.",
  authors: [{ name: "HYK" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${helveticaNeue.variable} ${pretendard.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScroll />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
