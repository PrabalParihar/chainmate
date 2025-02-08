// src/tailwind.d.ts
declare module "tailwindcss/lib/util/flattenColorPalette" {
    import { type CSSRuleObject } from "tailwindcss/types/config";
    
    export default function flattenColorPalette(
      colors: CSSRuleObject["colors"]
    ): Record<string, string>;
  }
  