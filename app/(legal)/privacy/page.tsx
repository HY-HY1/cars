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
  title: "Privacy Policy | Cars",
  description:
    "Learn how Cars collects, uses, and protects your information.",
};

const TOC = [
  { id: "information-collected", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "information-sharing", title: "Information Sharing" },
  { id: "cookies", title: "Cookies and Tracking" },
  { id: "data-retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Rights" },
  { id: "security", title: "Data Security" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "third-parties", title: "Third-Party Services" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPage() {
  return (
    <LegalPageWrapper>
      <LegalHeader
        title="Privacy Policy"
        subtitle="This Privacy Policy explains how we collect, use, and protect your personal data when you use Cars and our digital products."
        effectiveDate="January 1, 2025"
        lastUpdated="January 1, 2025"
      />

      <LegalTableOfContents items={TOC} />

      {/* 1. INFORMATION COLLECTED */}
      <LegalSection id="information-collected" number={1} title="Information We Collect">
        <LegalSubSection title="Information You Provide">
          <LegalBody>
            We collect personal information that you provide when using our website,
            purchasing digital products, or contacting us.
          </LegalBody>

          <LegalList
            items={[
              "Name and email address",
              "Account login details (if applicable)",
              "Billing and payment information (processed securely by Stripe — we do not store full card details)",
              "Customer support messages and communications",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="Information Collected Automatically">
          <LegalBody>
            When you use our website, we automatically collect limited technical
            data to ensure security, functionality, and performance.
          </LegalBody>

          <LegalList
            items={[
              "IP address and approximate location",
              "Device type, browser, and operating system",
              "Pages visited and time spent on site",
              "Referral source (how you found our website)",
              "Cookies and usage tracking data",
            ]}
          />
        </LegalSubSection>
      </LegalSection>

      {/* 2. HOW WE USE DATA */}
      <LegalSection id="how-we-use" number={2} title="How We Use Your Information">
        <LegalBody>
          We use your information to operate, deliver, and improve our digital
          products and services.
        </LegalBody>

        <LegalList
          items={[
            "Provide access to purchased digital content",
            "Process payments and manage transactions",
            "Deliver customer support",
            "Improve website performance and user experience",
            "Send important service-related updates",
            "Prevent fraud, abuse, or misuse",
            "Comply with legal and tax obligations",
          ]}
        />

        <LegalCallout variant="info" title="Legal Basis (UK GDPR)">
          We process personal data under the following legal bases:
          <br />
          • Contract — to deliver purchased digital products
          <br />
          • Legal obligation — tax and accounting compliance
          <br />
          • Legitimate interest — fraud prevention and service improvement
          <br />
          • Consent — optional marketing communications
        </LegalCallout>
      </LegalSection>

      {/* 3. SHARING */}
      <LegalSection id="information-sharing" number={3} title="Information Sharing">
        <LegalBody>
          We do not sell your personal data. We only share information when necessary
          to operate our business or comply with legal obligations.
        </LegalBody>

        <LegalSubSection title="Service Providers">
          <LegalBody>
            We may share limited data with trusted third-party providers who help
            us operate our platform.
          </LegalBody>

          <LegalList
            items={[
              "Payment processors (e.g. Stripe)",
              "Hosting and infrastructure providers",
              "Analytics providers",
              "Email and communication tools",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="Legal Requirements">
          <LegalBody>
            We may disclose information if required by law, court order, or to
            protect our legal rights.
          </LegalBody>
        </LegalSubSection>

        <LegalSubSection title="Business Transfers">
          <LegalBody>
            If the business is involved in a merger, acquisition, or asset sale,
            your data may be transferred as part of that transaction.
          </LegalBody>
        </LegalSubSection>
      </LegalSection>

      {/* 4. COOKIES */}
      <LegalSection id="cookies" number={4} title="Cookies and Tracking">
        <LegalBody>
          We use cookies and similar technologies to operate our website and understand
          user behaviour.
        </LegalBody>

        <LegalList
          items={[
            "Essential cookies — required for site and checkout functionality",
            "Analytics cookies — help us understand usage and improve performance",
            "Functional cookies — remember preferences and settings",
          ]}
        />

        <LegalCallout>
          You can disable cookies through your browser settings. However, some parts
          of the service may not function correctly if cookies are disabled.
        </LegalCallout>
      </LegalSection>

      {/* 5. RETENTION */}
      <LegalSection id="data-retention" number={5} title="Data Retention">
        <LegalBody>
          We retain personal data only for as long as necessary to provide services,
          comply with legal obligations, and resolve disputes.
        </LegalBody>

        <LegalBody>
          Purchase and transaction records may be retained for tax and accounting
          purposes even after account deletion.
        </LegalBody>
      </LegalSection>

      {/* 6. RIGHTS */}
      <LegalSection id="your-rights" number={6} title="Your Rights">
        <LegalBody>
          Under UK GDPR, you have rights regarding your personal data.
        </LegalBody>

        <LegalList
          items={[
            "Right to access your data",
            "Right to correct inaccurate data",
            "Right to request deletion of your data",
            "Right to restrict or object to processing",
            "Right to data portability",
            "Right to withdraw consent for marketing",
          ]}
        />

        <LegalCallout variant="info">
          Some rights may be limited where we are legally required to retain data
          (e.g. tax or fraud prevention obligations).
        </LegalCallout>
      </LegalSection>

      {/* 7. SECURITY */}
      <LegalSection id="security" number={7} title="Data Security">
        <LegalBody>
          We use appropriate technical and organisational measures to protect your
          personal data against unauthorised access, loss, or misuse.
        </LegalBody>

        <LegalCallout variant="warning">
          No method of transmission or storage is completely secure. While we take
          reasonable precautions, we cannot guarantee absolute security.
        </LegalCallout>
      </LegalSection>

      {/* 8. CHILDREN */}
      <LegalSection id="childrens-privacy" number={8} title="Children's Privacy">
        <LegalBody>
          Our services are not intended for individuals under 18 years of age. We do
          not knowingly collect personal data from minors.
        </LegalBody>
      </LegalSection>

      {/* 9. THIRD PARTIES */}
      <LegalSection id="third-parties" number={9} title="Third-Party Services">
        <LegalBody>
          Our website integrates with third-party services that have their own privacy
          policies.
        </LegalBody>

        <LegalList
          items={[
            "Stripe — payment processing",
            "Supabase or similar backend infrastructure",
            "Analytics providers",
            "Email service providers",
          ]}
        />
      </LegalSection>

      {/* 10. CHANGES */}
      <LegalSection id="changes" number={10} title="Changes to This Policy">
        <LegalBody>
          We may update this Privacy Policy from time to time. Updates will be posted
          on this page with a revised date.
        </LegalBody>
      </LegalSection>

      {/* 11. CONTACT */}
      <LegalSection id="contact" number={11} title="Contact Us">
        <LegalBody>
          If you have any questions about this Privacy Policy or your personal data,
          you can contact us below.
        </LegalBody>

        <LegalList
          items={[
            "Email: support@carsplaybook.com",
            "Response time: within 30 days",
          ]}
        />
      </LegalSection>

      <LegalContactFooter email="support@carsplaybook.com" />
    </LegalPageWrapper>
  );
}