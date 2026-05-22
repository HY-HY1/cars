import { AccessLocked } from "@/components/dashboard/access-locked";
import {
  LessonBody,
  LessonCallout,
  LessonHeader,
  LessonKeyTakeaway,
  LessonResource,
  LessonResourceGroup,
  LessonSection,
  LessonSteps,
  LessonSubSection,
  PlaybookLesson,
} from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Deal Sourcing Tracker" };

export default async function DealSourcingTrackerPage() {
  const { user } = await requireUser("/dashboard/resources/deal-sourcing-tracker");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="Resource"
        tag="Essential"
        title="Deal Sourcing Tracker"
        duration="10 min"
        description="A Notion database for logging every deal you evaluate — so you always know what you're looking at, what you've offered, and where each car stands."
      />

      <LessonResourceGroup title="Open the tracker">
        <LessonResource
          title="Deal Sourcing Tracker"
          description="Duplicate this into your own Notion workspace to get started"
          href="https://chiseled-mosquito-694.notion.site/368c2df3bcbb8012959fc49833242de6?v=368c2df3bcbb804e81d2000c92e71a24"
          type="link"
          external
        />
      </LessonResourceGroup>

      <LessonSection number={1} title="Why you need to track every deal">
        <LessonBody>
          Most people only log the cars they actually buy. That's a mistake. The deals you pass on are just as important — they build your instincts for what a good price looks like, and they stop you from second-guessing yourself when a similar car comes up again.
        </LessonBody>
        <LessonBody>
          The tracker gives you a single place to log every car you seriously consider: what it cost, what you thought it was worth, and what happened. Over time it becomes your personal deal database — and it'll save you from making the same mistakes twice.
        </LessonBody>
        <LessonCallout variant="tip" title="Pro tip">
          After your first 20 deals tracked, look back at the ones you passed on. You'll almost always find two or three you should have bought — and two or three you're very glad you didn't.
        </LessonCallout>
      </LessonSection>

      <LessonSection number={2} title="Column-by-column walkthrough">
        <LessonBody>
          Here's what each field in the tracker is for and how to fill it in correctly.
        </LessonBody>

        <LessonSubSection title="Vehicle">
          <LessonBody>
            Make, model, year, and mileage in one field. Be consistent — "VW Polo 2017 33k" is easier to scan than "2017 Volkswagen Polo 1.0 TSI 33,000 miles". Keep it short.
          </LessonBody>
        </LessonSubSection>

        <LessonSubSection title="Source / Platform">
          <LessonBody>
            Where you found the listing. Common values: Facebook Marketplace, AutoTrader, eBay Motors, BCA Auction, Manheim, Copart, Gumtree. Tracking this tells you which platforms are producing the best deals for your budget.
          </LessonBody>
        </LessonSubSection>

        <LessonSubSection title="Asking Price">
          <LessonBody>
            The seller's listed price — exactly as advertised, not what you think you can negotiate it to. This is your starting reference point.
          </LessonBody>
        </LessonSubSection>

        <LessonSubSection title="Target Buy Price">
          <LessonBody>
            The maximum you're willing to pay after accounting for all costs and your target margin. Work this out before you contact the seller — not during the negotiation. If the deal doesn't work at this number, it doesn't work.
          </LessonBody>
          <div className="overflow-hidden rounded-xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-white/30">Formula</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-white/30">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Estimated sale price</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£5,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">− Estimated costs (repairs, transport, fees)</td>
                  <td className="px-4 py-2.5 text-right text-white/55">− £900</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">− Target profit</td>
                  <td className="px-4 py-2.5 text-right text-white/55">− £800</td>
                </tr>
                <tr className="bg-white/3">
                  <td className="px-4 py-2.5 font-semibold text-white/80">= Max buy price</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-[#1D9E75]">£3,800</td>
                </tr>
              </tbody>
            </table>
          </div>
        </LessonSubSection>

        <LessonSubSection title="Estimated Costs">
          <LessonBody>
            A rough total for everything beyond the purchase price: repairs, transport, auction fees, MOT, insurance while you hold it. You don't need exact quotes at the tracking stage — a realistic estimate is enough. Tighten the number before you make an offer.
          </LessonBody>
        </LessonSubSection>

        <LessonSubSection title="Estimated Sale Price">
          <LessonBody>
            What you expect to sell the car for based on current market comps. Check AutoTrader for equivalent examples — same make, model, year, and mileage range — and use the middle of what's actually selling, not the top of what's listed.
          </LessonBody>
          <LessonCallout variant="warning" title="Don't use asking prices as comps">
            Cars sit on AutoTrader for months at optimistic prices. Look at sold listings on eBay Motors and talk to dealers to understand what's actually clearing. Listing price ≠ sale price.
          </LessonCallout>
        </LessonSubSection>

        <LessonSubSection title="Estimated Profit & ROI">
          <LessonBody>
            Calculated automatically if you use formulas in Notion (Sale Price − Buy Price − Costs). ROI is your profit divided by total money in. Aim for at least 15–20% ROI to make the deal worth your time.
          </LessonBody>
        </LessonSubSection>

        <LessonSubSection title="Listing URL">
          <LessonBody>
            Paste the link to the original listing. Listings disappear fast — especially on Facebook. If the car goes and you want to reference the photos or spec later, you'll be glad you saved it.
          </LessonBody>
        </LessonSubSection>

        <LessonSubSection title="Notes">
          <LessonBody>
            Anything the listing doesn't tell you: what the seller said on the phone, condition concerns from the photos, upcoming MOT dates, whether there are multiple owners interested. This is your scratchpad.
          </LessonBody>
        </LessonSubSection>
      </LessonSection>

      <LessonSection number={3} title="The Status field">
        <LessonBody>
          Status is the most important field in the tracker. It tells you exactly where every deal stands at a glance. Keep it updated — if your status column is stale, the tracker stops working.
        </LessonBody>

        <div className="overflow-hidden rounded-xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/3">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-white/30">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-white/30">What it means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-xs font-medium text-white/60">Watching</span>
                </td>
                <td className="px-4 py-2.5 text-white/55">You've logged it but haven't contacted the seller yet</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-blue-950/50 px-2.5 py-0.5 text-xs font-medium text-blue-400">Contacted</span>
                </td>
                <td className="px-4 py-2.5 text-white/55">You've messaged or called — waiting to hear back or arrange a viewing</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-amber-950/40 px-2.5 py-0.5 text-xs font-medium text-amber-400">Offered</span>
                </td>
                <td className="px-4 py-2.5 text-white/55">You've made an offer and are waiting on a response</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-[rgba(29,158,117,0.15)] px-2.5 py-0.5 text-xs font-medium text-[#1D9E75]">Won</span>
                </td>
                <td className="px-4 py-2.5 text-white/55">Offer accepted — car is yours or in transit</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-[rgba(232,255,71,0.08)] px-2.5 py-0.5 text-xs font-medium text-[#e8ff47]">Sold</span>
                </td>
                <td className="px-4 py-2.5 text-white/55">Flipped and money's in the bank — update with the actual sale price</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-red-950/40 px-2.5 py-0.5 text-xs font-medium text-red-400">Passed</span>
                </td>
                <td className="px-4 py-2.5 text-white/55">You decided not to pursue it — record why in the Notes field</td>
              </tr>
            </tbody>
          </table>
        </div>

        <LessonCallout variant="info" title="Passed entries are data">
          Every deal you log as Passed — with a reason — teaches you something. Over time you'll see patterns: "I keep passing on cars with no V5C" or "every Audi I've looked at has been overpriced". That's knowledge you can't get any other way.
        </LessonCallout>
      </LessonSection>

      <LessonSection number={4} title="How to use it day-to-day">
        <LessonSteps
          steps={[
            {
              title: "Add a row the moment you open a listing seriously",
              description:
                "If you've spent more than 30 seconds looking at a car, log it. Don't wait until you've decided — log it now and use the tracker to help you decide.",
            },
            {
              title: "Fill in your numbers before contacting the seller",
              description:
                "Work out your Target Buy Price before you pick up the phone. Sellers can tell when you're calculating on the fly — it weakens your position.",
            },
            {
              title: "Update the Status every time something changes",
              description:
                "Contacted, offered, won, passed — keep it current. A tracker with stale statuses is useless.",
            },
            {
              title: "After every Sold deal, compare estimated vs actual",
              description:
                "Did your cost estimate hold up? Was your sale price in line with your comp? This is how you calibrate your numbers over time.",
            },
            {
              title: "Review your Passed deals monthly",
              description:
                "Look back at what you passed on and why. Some of them you'll be glad about. A few will teach you where your criteria need adjusting.",
            },
          ]}
        />
      </LessonSection>

      <LessonKeyTakeaway>
        The best flippers aren't just good at buying cars — they're disciplined about tracking them. Log every deal you seriously consider, not just the ones you buy. After 30 entries your tracker becomes one of the most valuable tools you own.
      </LessonKeyTakeaway>
    </PlaybookLesson>
  );
}
