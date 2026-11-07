"use client";

import { useEffect } from "react";

export function ScrollToHash() {
  useEffect(() => {
    try {
      const id = decodeURIComponent(location.hash.slice(1));
      document.getElementById(id)?.scrollIntoView();
    } catch {}
  }, []);

  return null;
}
