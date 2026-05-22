import { AccessLocked } from "@/components/dashboard/access-locked";
import {
  LessonBody,
  LessonCallout,
  LessonHeader,
  LessonKeyTakeaway,
  LessonNavigation,
  LessonSection,
  LessonSubSection,
  PlaybookLesson,
} from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 4 — Vehicle Evaluation" };

export default async function Module4Page() {
  const { user } = await requireUser("/dashboard/playbook/4");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="04"
        tag="Core"
        title="Vehicle Evaluation"
        duration="30 min"
        description="MOT history, HPI checks, CAT cars, service records — everything you check before making an offer."
      />

      <LessonSection number={1} title="Buying a Car With No MOT">
        <LessonBody>
          When browsing auction listings, always pull up the vehicle's MOT history before you bid. An MOT certificate tells you the car is roadworthy right now — but the history tells you what it's been failing on year after year, and that's the number you actually need.
        </LessonBody>

        <LessonBody>
          Advisories from previous MOTs don't fail the car outright, but they flag work that will need doing soon. If you're not budgeting for them, they will eat into your profit — or wipe it out entirely.
        </LessonBody>

        <LessonCallout variant="warning" title="Check previous MOTs, not just the current one">
          A car can pass its MOT with a long list of advisories. Those advisories become next year's failures. Always look at the full history, not just whether the car currently has a valid certificate.
        </LessonCallout>

        <LessonSubSection title="Common advisory costs to factor in">
          <div className="overflow-hidden rounded-xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-white/30">Item</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-white/30">Estimated cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Full set of tyres</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£200 – £400+</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Brake pads (front &amp; rear)</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£200 – £500+</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Lights / indicators</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£20 – £150+</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Fresh MOT</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£50 – £60</td>
                </tr>
              </tbody>
            </table>
          </div>
        </LessonSubSection>

        <LessonSubSection title="Real example — why this matters on cheaper flips">
          <LessonBody>
            Cheaper cars have much thinner margins, which means advisory costs hit harder. Here's what a seemingly straightforward budget flip can look like once you add it all up:
          </LessonBody>
          <div className="overflow-hidden rounded-xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-white/30">Item</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-white/30">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Purchase price (e.g. Vauxhall Corsa)</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£1,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">New tyres</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£200</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">New brake pads</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£250</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">MOT</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£50</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Transportation &amp; insurance</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£150+</td>
                </tr>
                <tr className="bg-white/3">
                  <td className="px-4 py-2.5 font-semibold text-white/80">Total cost</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-white/80">£1,650+</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Expected sale price (Facebook Marketplace)</td>
                  <td className="px-4 py-2.5 text-right text-white/55">~£1,500</td>
                </tr>
                <tr className="bg-[rgba(239,68,68,0.06)]">
                  <td className="px-4 py-2.5 font-semibold text-red-400">Result</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-red-400">Loss</td>
                </tr>
              </tbody>
            </table>
          </div>
        </LessonSubSection>

        <LessonKeyTakeaway>
          Always check previous MOT history before you bid — not just whether there's a valid cert. Advisories are future costs. Price them in upfront or walk away.
        </LessonKeyTakeaway>
      </LessonSection>

      <LessonNavigation
        prev={{ title: "Sourcing Deals", href: "/dashboard/playbook/3" }}
        next={{ title: "Worked Flip Examples", href: "/dashboard/playbook/5" }}
      />
    </PlaybookLesson>
  );
}
