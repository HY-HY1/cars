import HeadingBadge from "@/components/common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    value: "experience",
    question: "Do I need experience to start flipping cars?",
    answer:
      "No. This playbook is built for complete beginners and breaks down the entire process step-by-step — from finding undervalued cars to selling them for profit.",
  },
  {
    value: "included",
    question: "What’s included in the playbook?",
    answer:
      "You’ll get proven sourcing methods, negotiation frameworks, inspection checklists, pricing strategies, profit calculators, marketplace message templates, and the exact systems used to find profitable flips.",
  },
  {
    value: "capital",
    question: "How much money do I need to start?",
    answer:
      "You can realistically start with £1,000–£3,000. The playbook shows you how to target cheaper, higher-margin cars first, then scale into bigger flips as your capital grows.",
  },
  {
    value: "time",
    question: "How quickly can I make my first flip?",
    answer:
      "Some people find their first deal within days. Others take a few weeks. Your speed depends on how consistently you apply the sourcing and negotiation strategies inside the playbook.",
  },
  {
    value: "cars",
    question: "What types of cars should I flip?",
    answer:
      "The playbook covers the best beginner-friendly categories, including reliable hatchbacks, first cars, diesel commuters, and high-demand budget cars that consistently sell fast in the UK market.",
  },
  {
    value: "legal",
    question: "Is flipping cars legal in the UK?",
    answer:
      "Yes. Many people legally buy and sell cars privately for profit. The playbook explains the basics around ownership, V5Cs, tax considerations, insurance, and when you may need to register as a trader.",
  },
  {
    value: "refund",
    question: "Do you offer refunds?",
    answer:
      "Yes — if you’re genuinely not satisfied, reach out within 14 days and we’ll work to make it right.",
  },
  {
    value: "updates",
    question: "Will I get future updates?",
    answer:
      "Yes. As the market changes and new strategies emerge, the playbook will be updated and you’ll receive future versions at no extra cost.",
  },
];

type FAQItem = {
  value: string;
  question: string;
  answer: string;
};

export function FAQSection() {
  return (
    <section className="py-16 px-4 m-auto">
      <div className="w-full flex justify-center">
        <HeadingBadge>
        FAQ
      </HeadingBadge>
      </div>
      <h2 className="text-center text-2xl font-semibold mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-muted-foreground mb-10 text-sm">
        Still have questions? Email us at support@yoursite.com
      </p>
      <Accordion type="multiple" defaultValue={["beginners"]} className="max-w-2xl mx-auto">
        {faqItems.map((item: FAQItem) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
