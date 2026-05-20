import { offer, discountLabel } from "@/lib/offer"
import { getCheckoutProduct } from "@/lib/stripe-product"

export async function getProductData() {
  const product = await getCheckoutProduct()

  return {
    name: product.name,
    description: product.description ?? "",
    price: product.amountCents,
    currency: product.currency,

    // add marketing metadata here
    compareAtPrice: offer.regularPricePence,
    badge: discountLabel,

    features: [
      {
        title: "8-module video course",
        desc: "Complete step-by-step flipping system.",
      },
      {
        title: "Inspection checklist",
        desc: "Avoid expensive mistakes.",
      },
      {
        title: "Negotiation scripts",
        desc: "Learn how to lower asking prices.",
      },
      {
        title: "Profit calculator",
        desc: "Estimate realistic margins before buying.",
      },
    ],
  }
}