import { AccessLocked } from "@/components/dashboard/access-locked";
import {
  LessonBody,
  LessonCallout,
  LessonHeader,
  LessonKeyTakeaway,
  LessonNavigation,
  LessonSection,
  LessonSubSection,
  LessonVideo,
  PlaybookLesson,
} from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 5 — Worked Flip Examples" };

export default async function Module5Page() {
  const { user } = await requireUser("/dashboard/playbook/5");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="05"
        tag="Core"
        title="Worked Flip Examples"
        duration="25 min"
        description="Two real flips broken down cost by cost — what worked, what didn't, and what the margin actually looked like."
      />

            <LessonVideo
              source={{ type: "youtube", id: "xrMElkNY8Rk" }}
              caption="Module 1 — Welcome & Orientation (12 min)"
            />

      <LessonSection number={1} title="Cat S Flip — Volkswagen Polo 2017">
        <LessonBody>
          A Cat S vehicle is one that has suffered structural damage but has been repaired and signed off as roadworthy. They sell cheaply at auction and can offer strong margins — but they require more work, more parts, and more paperwork than a clean example.
        </LessonBody>

        <LessonCallout variant="warning" title="More work involved">
          Cat S cars take longer to turn around and carry more risk if you underestimate the repair costs. Only take these on once you have a reliable mechanic and a clear parts quote before you bid.
        </LessonCallout>

        <LessonSubSection title="Vehicle details">
          <ul className="space-y-1.5 text-sm text-white/55">
            <li><span className="text-white/30">Make / Model</span> &nbsp;Volkswagen Polo</li>
            <li><span className="text-white/30">Year</span> &nbsp;2017</li>
            <li><span className="text-white/30">Mileage</span> &nbsp;33,000 miles</li>
            <li><span className="text-white/30">Category</span> &nbsp;Cat S (structural damage, repaired)</li>
          </ul>
        </LessonSubSection>

        <LessonSubSection title="Full cost breakdown">
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
                  <td className="px-4 py-2.5 text-white/55">Auction purchase price</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£2,300.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Auction fees &amp; charges</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£547.60</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Transportation</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£180.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Seatbelts</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£150.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Doors</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£300.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Seat</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£120.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Side skirt repair (Cat S damage)</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£300.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Fresh MOT</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£50.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">Insurance</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£20.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-white/55">V62 form (Didnt come with V5C)</td>
                  <td className="px-4 py-2.5 text-right text-white/55">£30.00</td>
                </tr>
                <tr className="bg-white/3">
                  <td className="px-4 py-2.5 font-semibold text-white/80">Total cost</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-white/80">£3,997.60</td>
                </tr>
              </tbody>
            </table>
          </div>
        </LessonSubSection>

        <LessonSubSection title="Result">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Sale price</p>
              <p className="mt-1 font-syne text-lg font-bold text-white">£5,500</p>
            </div>
            <div className="rounded-xl border border-[rgba(29,158,117,0.3)] bg-[rgba(29,158,117,0.06)] px-4 py-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1D9E75]/70">Gross profit</p>
              <p className="mt-1 font-syne text-lg font-bold text-[#1D9E75]">£1,502.40</p>
            </div>
            <div className="rounded-xl border border-[rgba(232,255,71,0.15)] bg-[rgba(232,255,71,0.04)] px-4 py-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#e8ff47]/50">ROI</p>
              <p className="mt-1 font-syne text-lg font-bold text-[#e8ff47]">27.3%</p>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-white/30">Turned around in 2 weeks</p>
        </LessonSubSection>

        <LessonKeyTakeaway>
          Cat S doesn't mean unsellable — it means underpriced at auction. Get a full parts quote before you bid, factor in every cost (transport, paperwork, MOT), and there's a solid margin to be made on the right example.
        </LessonKeyTakeaway>
      </LessonSection>

      <LessonNavigation
        prev={{ title: "Vehicle Evaluation", href: "/dashboard/playbook/4" }}
        next={{ title: "Negotiation", href: "/dashboard/playbook/6" }}
      />
    </PlaybookLesson>
  );
}
