import type { Appearance } from "@stripe/stripe-js";

/** Stripe Elements theme aligned with docs/design-system.md */
export const stripeAppearance: Appearance = {
  theme: "night",
  variables: {
    colorPrimary: "#fafafa",
    colorBackground: "#09090b",
    colorText: "#fafafa",
    colorDanger: "#f87171",
    fontFamily: "'Poppins', system-ui, sans-serif",
    fontSizeBase: "14px",
    spacingUnit: "4px",
    borderRadius: "12px",
  },
  rules: {
    ".Input": {
      border: "1px solid #27272a",
      backgroundColor: "#09090b",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid #52525b",
      boxShadow: "none",
    },
    ".Label": {
      color: "#d4d4d8",
      fontWeight: "500",
    },
    ".Tab": {
      border: "1px solid #27272a",
      backgroundColor: "#18181b",
    },
    ".Tab--selected": {
      border: "1px solid #52525b",
      backgroundColor: "#27272a",
    },
  },
};
