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
  title: "Refund Policy | Cars",
  description:
    "Understand the refund and cancellation terms for Cars digital products.",
};

const TOC = [
  { id: "overview", title: "Policy Overview" },
  { id: "eligibility", title: "Refund Eligibility" },
  { id: "how-to-request", title: "How to Request a Refund" },
  { id: "timeline", title: "Processing Timeline" },
  { id: "non-refundable", title: "Non-Refundable Items" },
  { id: "partial-refunds", title: "Partial Refunds" },
  { id: "chargebacks", title: "Chargebacks" },
  { id: "contact", title: "Contact Us" },
];

export default function RefundsPage() {
  return (
    <LegalPageWrapper>
      <LegalHeader
        title="Refund Policy"
        subtitle="This policy explains how refunds are handled for digital products purchased through Cars."
        effectiveDate="January 1, 2025"
        lastUpdated="January 1, 2025"
      />

      <LegalTableOfContents items={TOC} />

      {/* OVERVIEW */}
      <LegalSection id="overview" number={1} title="Policy Overview">
        <LegalBody>
          This Refund Policy applies to all digital products and educational
          content sold through Cars, including courses, guides, and downloadable
          materials.
        </LegalBody>

        <LegalBody>
          Because our products are delivered digitally with immediate access,
          different rules apply compared to physical goods.
        </LegalBody>

        <LegalCallout variant="info" title="Important">
          By completing a purchase, you acknowledge that access to digital
          content is provided immediately and that your statutory right to
          cancel may be affected once access begins.
        </LegalCallout>
      </LegalSection>

      {/* ELIGIBILITY */}
      <LegalSection id="eligibility" number={2} title="Refund Eligibility">
        <LegalBody>
          Refunds are not guaranteed and are assessed on a case-by-case basis
          in line with UK consumer law.
        </LegalBody>

        <LegalList
          items={[
            "The product was not delivered or access was not granted",
            "A verified technical issue prevented access to the content",
            "A duplicate or accidental payment was made",
          ]}
        />

        <LegalSubSection title="Ineligible Circumstances">
          <LegalBody>
            Refunds will generally not be granted where:
          </LegalBody>

          <LegalList
            items={[
              "You have accessed or consumed a significant portion of the content",
              "You changed your mind after purchase",
              "You expected specific financial or business results",
              "You failed to review product descriptions before purchasing",
            ]}
          />
        </LegalSubSection>

        <LegalCallout variant="warning">
          As this is an educational digital product, results vary and no
          guarantees of income, success, or outcomes are made or implied.
        </LegalCallout>
      </LegalSection>

      {/* HOW TO REQUEST */}
      <LegalSection id="how-to-request" number={3} title="How to Request a Refund">
        <LegalBody>
          To request a refund, you must contact our support team with the
          required information below.
        </LegalBody>

        <LegalList
          ordered
          items={[
            "Email our support team using the contact details below",
            "Include your full name and email used at checkout",
            "Provide your order number or payment reference",
            "Explain clearly the reason for your request",
            "Allow up to 2–5 business days for review",
          ]}
        />

        <LegalCallout>
          Requests missing order details may experience delays in processing.
        </LegalCallout>
      </LegalSection>

      {/* TIMELINE */}
      <LegalSection id="timeline" number={4} title="Processing Timeline">
        <LegalBody>
          Refund requests are typically reviewed within 2–5 business days.
        </LegalBody>

        <LegalSubSection title="If Approved">
          <LegalBody>
            Approved refunds are processed back to your original payment method.
            Depending on your bank or card provider, this may take 5–10
            business days to appear in your account.
          </LegalBody>
        </LegalSubSection>

        <LegalCallout variant="info">
          Processing times may vary during busy periods or holidays.
        </LegalCallout>
      </LegalSection>

      {/* NON REFUNDABLE */}
      <LegalSection id="non-refundable" number={5} title="Non-Refundable Items">
        <LegalBody>
          Due to the nature of digital content, certain purchases are not
          eligible for refunds.
        </LegalBody>

        <LegalList
          items={[
            "Digital products once access has been granted or content has been viewed",
            "Purchases made after significant usage of the platform or materials",
            "Promotional or discounted purchases (unless legally required)",
            "Refund requests based on personal expectations or outcomes",
          ]}
        />

        <LegalCallout variant="warning" title="Consumer Rights Notice">
          Nothing in this policy affects your statutory rights under UK law.
          Where a product is faulty or not as described, you may still be
          entitled to a remedy.
        </LegalCallout>
      </LegalSection>

      {/* PARTIAL REFUNDS */}
      <LegalSection id="partial-refunds" number={6} title="Partial Refunds">
        <LegalBody>
          In some cases, we may issue partial refunds at our discretion.
        </LegalBody>

        <LegalBody>
          This may apply where only part of a bundle has been accessed or where
          a technical issue impacted limited functionality.
        </LegalBody>
      </LegalSection>

      {/* CHARGEBACKS */}
      <LegalSection id="chargebacks" number={7} title="Chargebacks">
        <LegalBody>
          We encourage you to contact us before initiating a chargeback with
          your payment provider.
        </LegalBody>

        <LegalCallout variant="warning">
          Filing a chargeback without contacting support first may result in
          account restrictions or permanent suspension to prevent fraud and
          abuse.
        </LegalCallout>

        <LegalBody>
          Most issues can be resolved quickly through direct support.
        </LegalBody>
      </LegalSection>

      {/* CONTACT */}
      <LegalSection id="contact" number={8} title="Contact Us">
        <LegalBody>
          If you have any questions about this Refund Policy or need assistance
          with a refund request, please contact us below.
        </LegalBody>

        <LegalList
          items={[
            "Email: support@carsplaybook.com",
            "Response time: 2–5 business days",
            "Please include your order number and checkout email",
          ]}
        />
      </LegalSection>

      <LegalContactFooter email="support@carsplaybook.com" />
    </LegalPageWrapper>
  );
}