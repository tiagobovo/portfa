import { Inter_Tight, Instrument_Serif } from "next/font/google";

/**
 * TIPOGRAFIA
 * -----------------------------------------------------------------------------
 * `sans`  → textos e títulos principais.
 * `serif` → acentos editoriais em itálico.
 * Para trocar, importe outra fonte de "next/font/google" e mantenha o
 * mesmo `variable` (--font-sans-family / --font-serif-family).
 */
export const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
});

export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-family",
  display: "swap",
});
