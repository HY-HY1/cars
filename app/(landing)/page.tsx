import React from "react";
import { FAQSection } from "./sections/FAQ";
import { Hero } from "./sections/Hero";
import TestimonialsSection from "./sections/reviews";
import ProductCard from "./sections/ProductCard";
import { CTASection } from "./sections/CTA";
import { CaseStudySection } from "./sections/CaseStudy";
import { WhoIsItFor } from "./sections/WhoIsItFor";
import { ComparisonSection } from "./sections/Comparison";
import { PurchaseProcess } from "./sections/PurchaseProcess";
import { getProductData } from "@/lib/product"

export default async function Page() {

  const product = await getProductData()

  return (
    <div>
      <Hero />
      <TestimonialsSection />
      <CaseStudySection />
      <WhoIsItFor />
      <div id="pricing">
        <ProductCard
          product={product}
          publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
          returnUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/success`}
        />
      </div>
      <ComparisonSection />
      <PurchaseProcess />
      <FAQSection />
      <CTASection />
    </div>
  );
}
