import type { Metadata } from "next";
import {
  LegalPageWrapper,
  LegalHeader,
  LegalTableOfContents,
  LegalSection,
  LegalSubSection,
  LegalBody,
  LegalList,
  LegalCallout,
  LegalContactFooter,
} from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Terms & Conditions | Cars",
  description:
    "Read the terms and conditions governing the use of Cars and its digital products.",
};

const TOC = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "account", title: "Account Registration" },
  { id: "services", title: "Products and Services" },
  { id: "payment", title: "Payment and Billing" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "prohibited", title: "Prohibited Conduct" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "governing-law", title: "Governing Law" },
  { id: "changes", title: "Changes to Terms" },
  { id: "contact", title: "Contact Information" },
];

export default function TermsPage() {
  return (
    <LegalPageWrapper>
      <LegalHeader
        title="Terms & Conditions"
        subtitle="These Terms govern your access to and use of Cars, including all digital products, educational materials, and services."
        effectiveDate="January 1, 2025"
        lastUpdated="January 1, 2025"
      />

      <LegalTableOfContents items={TOC} />

      {/* 1. ACCEPTANCE */}
      <LegalSection id="acceptance" number={1} title="Acceptance of Terms">
        <LegalBody>
          By accessing or purchasing from Cars, you agree to be legally bound by
          these Terms & Conditions. If you do not agree, you must not use our
          website or purchase our products.
        </LegalBody>

        <LegalCallout>
          Continued use of the service after updates to these Terms constitutes
          acceptance of the revised version.
        </LegalCallout>
      </LegalSection>

      {/* 2. ELIGIBILITY */}
      <LegalSection id="eligibility" number={2} title="Eligibility">
        <LegalBody>
          You must be at least 18 years old and have the legal capacity to enter
          into a binding contract to use our services.
        </LegalBody>

        <LegalList
          items={[
            "You confirm you are legally able to enter binding contracts",
            "You comply with all applicable laws in your jurisdiction",
            "You do not use the service for unlawful purposes",
          ]}
        />
      </LegalSection>

      {/* 3. ACCOUNT */}
      <LegalSection id="account" number={3} title="Account Registration">
        <LegalSubSection title="Account Creation">
          <LegalBody>
            Some features may require you to create an account. You agree to
            provide accurate and complete information during registration.
          </LegalBody>
        </LegalSubSection>

        <LegalSubSection title="Security">
          <LegalBody>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activity under your account.
          </LegalBody>
        </LegalSubSection>

        <LegalSubSection title="Termination">
          <LegalBody>
            We reserve the right to suspend or terminate accounts that violate
            these Terms or engage in fraudulent, abusive, or unlawful activity.
          </LegalBody>
        </LegalSubSection>
      </LegalSection>

      {/* 4. SERVICES */}
      <LegalSection id="services" number={4} title="Products and Services">
        <LegalBody>
          Cars provides digital educational content, including guides, courses,
          and resources related to car flipping and automotive resale strategies.
        </LegalBody>

        <LegalBody>
          All content is provided for educational purposes only. We do not
          guarantee any specific financial results or outcomes.
        </LegalBody>

        <LegalCallout variant="info" title="Service Changes">
          We reserve the right to modify, update, or discontinue any part of the
          service at any time without prior notice.
        </LegalCallout>
      </LegalSection>

      {/* 5. PAYMENT */}
      <LegalSection id="payment" number={5} title="Payment and Billing">
        <LegalSubSection title="Pricing">
          <LegalBody>
            Prices are displayed in GBP (£) unless otherwise stated. We reserve
            the right to change pricing at any time.
          </LegalBody>
        </LegalSubSection>

        <LegalSubSection title="Payment Processing">
          <LegalBody>
            Payments are processed securely by third-party providers such as
            Stripe. We do not store full payment card details.
          </LegalBody>

          <LegalList
            ordered
            items={[
              "Payment is required in full at the time of purchase",
              "Access is granted immediately after successful payment",
              "Failure of payment may result in denied access",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="Failed Payments">
          <LegalBody>
            If a payment fails, access to the service will not be granted or may
            be revoked until payment is successfully completed.
          </LegalBody>
        </LegalSubSection>
      </LegalSection>

      {/* 6. IP */}
      <LegalSection id="intellectual-property" number={6} title="Intellectual Property">
        <LegalBody>
          All content provided through Cars, including text, graphics, videos,
          and materials, is owned by or licensed to us and is protected by
          intellectual property laws.
        </LegalBody>

        <LegalBody>
          You are granted a limited, non-transferable, non-exclusive licence for
          personal use only. You may not copy, resell, distribute, or publicly
          share any content.
        </LegalBody>
      </LegalSection>

      {/* 7. PROHIBITED */}
      <LegalSection id="prohibited" number={7} title="Prohibited Conduct">
        <LegalBody>
          You agree not to misuse the service or engage in prohibited activities.
        </LegalBody>

        <LegalList
          items={[
            "Copying, reselling, or redistributing content",
            "Attempting to reverse engineer or bypass access controls",
            "Using the service for fraudulent or unlawful activity",
            "Harassing, abusing, or harming other users",
            "Using bots, scrapers, or automated tools without permission",
            "Violating any applicable laws or regulations",
          ]}
        />

        <LegalCallout variant="warning">
          Violations may result in immediate suspension or permanent termination
          of access without refund.
        </LegalCallout>
      </LegalSection>

      {/* 8. DISCLAIMERS */}
      <LegalSection id="disclaimers" number={8} title="Disclaimers">
        <LegalBody>
          The service and all content are provided on an “as is” and “as
          available” basis without warranties of any kind.
        </LegalBody>

        <LegalBody>
          We do not guarantee that you will achieve any financial success,
          profits, or specific outcomes from using our materials.
        </LegalBody>

        <LegalCallout variant="warning">
          All educational content is for informational purposes only and does
          not constitute financial, legal, or professional advice.
        </LegalCallout>
      </LegalSection>

      {/* 9. LIABILITY */}
      <LegalSection id="liability" number={9} title="Limitation of Liability">
        <LegalBody>
          To the maximum extent permitted by law, we are not liable for any
          indirect, incidental, or consequential damages arising from your use
          of the service.
        </LegalBody>

        <LegalBody>
          Our total liability for any claim shall not exceed the amount paid by
          you for the product giving rise to the claim.
        </LegalBody>

        <LegalCallout variant="info">
          Nothing in these Terms excludes liability where it would be unlawful
          to do so under UK consumer law.
        </LegalCallout>
      </LegalSection>

      {/* 10. LAW */}
      <LegalSection id="governing-law" number={10} title="Governing Law">
        <LegalBody>
          These Terms are governed by the laws of England and Wales.
        </LegalBody>

        <LegalBody>
          Any disputes arising under these Terms shall be subject to the
          exclusive jurisdiction of the courts of England and Wales.
        </LegalBody>
      </LegalSection>

      {/* 11. CHANGES */}
      <LegalSection id="changes" number={11} title="Changes to Terms">
        <LegalBody>
          We may update these Terms at any time. The latest version will always
          be posted on this page with an updated revision date.
        </LegalBody>

        <LegalBody>
          Continued use of the service after changes means you accept the updated
          Terms.
        </LegalBody>
      </LegalSection>

      {/* 12. CONTACT */}
      <LegalSection id="contact" number={12} title="Contact Information">
        <LegalBody>
          If you have any questions about these Terms, you can contact us below.
        </LegalBody>

        <LegalList
          items={[
            "Email: legal@carsplaybook.com",
            "Response time: within 5 business days",
          ]}
        />
      </LegalSection>

      <LegalContactFooter email="legal@carsplaybook.com" />
    </LegalPageWrapper>
  );
}