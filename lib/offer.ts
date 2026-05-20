/**
 * Central offer / discount configuration.
 * Change these values to update pricing display across the entire site.
 *
 * The actual sale price is pulled from Stripe — edit it there.
 * regularPricePence is the crossed-out "was" price shown for comparison.
 * discountPct is the percentage displayed in badges and CTA copy.
 */
export const offer = {
  /** Crossed-out original price in pence (£197.00 = 19700) */
  regularPricePence: 4999,
  /** Discount percentage shown in badges, announcement bar, and CTA buttons */
  discountPct: 60,
} as const

/** Short badge label, e.g. "60% OFF" */
export const discountLabel = `${offer.discountPct}% OFF`
