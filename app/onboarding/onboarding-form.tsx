"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

import { saveOnboarding } from "@/lib/onboarding/actions";

// ── Field helpers ───────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold text-white/80">{children}</p>
  );
}

function OptionGrid({
  name: _name,
  value,
  onChange,
  options,
  cols = 2,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; sub?: string }[];
  cols?: 2 | 3;
}) {
  return (
    <div className={`grid gap-2.5 ${cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
              selected
                ? "border-[#e8ff47] bg-[rgba(232,255,71,0.08)] text-white"
                : "border-white/8 bg-white/3 text-white/60 hover:border-white/20 hover:text-white/80"
            }`}
          >
            <span className="font-medium">{o.label}</span>
            {o.sub && (
              <span className="mt-0.5 block text-[11px] text-white/40">{o.sub}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function TextInput({
  name,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      name={name}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-[#e8ff47]/50 focus:bg-white/6"
    />
  );
}

function Textarea({
  name,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full resize-none rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-[#e8ff47]/50 focus:bg-white/6"
    />
  );
}

// ── Step definitions ────────────────────────────────────────

const STEPS = ["About you", "Your situation", "Your goals"];

// ── Main form ───────────────────────────────────────────────

type Fields = {
  name: string;
  age_range: string;
  employment: string;
  capital_range: string;
  weekly_hours: string;
  experience: string;
  goal: string;
  target_monthly: string;
  notes: string;
};

type InitialValues = Partial<Record<keyof Fields, string | null>>;

export function OnboardingForm({
  email,
  initialValues,
}: {
  email: string;
  initialValues?: InitialValues;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [fields, setFields] = useState<Fields>({
    name:           initialValues?.name           ?? "",
    age_range:      initialValues?.age_range      ?? "",
    employment:     initialValues?.employment     ?? "",
    capital_range:  initialValues?.capital_range  ?? "",
    weekly_hours:   initialValues?.weekly_hours   ?? "",
    experience:     initialValues?.experience     ?? "",
    goal:           initialValues?.goal           ?? "",
    target_monthly: initialValues?.target_monthly ?? "",
    notes:          initialValues?.notes          ?? "",
  });

  const [state, action, pending] = useActionState(saveOnboarding, {});

  function set(key: keyof Fields) {
    return (v: string) => setFields((f) => ({ ...f, [key]: v }));
  }

  function next() {
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  // After successful save, redirect to login
  if (state.success) {
    const loginHref = email
      ? `/login?email=${encodeURIComponent(email)}&next=/dashboard`
      : "/login?next=/dashboard";
    router.push(loginHref);
    return null;
  }

  const stepContent = [
    // ── Step 0: About you ────────────────────────────────
    <div key="step0" className="space-y-6">
      <div>
        <Label>What&apos;s your first name?</Label>
        <TextInput
          name="name"
          value={fields.name}
          onChange={set("name")}
          placeholder="e.g. James"
        />
      </div>

      <div>
        <Label>Age range</Label>
        <OptionGrid
          name="age_range"
          value={fields.age_range}
          onChange={set("age_range")}
          cols={3}
          options={[
            { value: "18-24", label: "18–24" },
            { value: "25-34", label: "25–34" },
            { value: "35-44", label: "35–44" },
            { value: "45-54", label: "45–54" },
            { value: "55+",   label: "55+" },
          ]}
        />
      </div>

      <div>
        <Label>Employment status</Label>
        <OptionGrid
          name="employment"
          value={fields.employment}
          onChange={set("employment")}
          options={[
            { value: "employed_full",  label: "Employed", sub: "Full-time" },
            { value: "employed_part",  label: "Employed", sub: "Part-time" },
            { value: "self_employed",  label: "Self-employed" },
            { value: "student",        label: "Student" },
            { value: "not_working",    label: "Not working" },
            { value: "retired",        label: "Retired" },
          ]}
        />
      </div>
    </div>,

    // ── Step 1: Your situation ────────────────────────────
    <div key="step1" className="space-y-6">
      <div>
        <Label>Capital available to invest</Label>
        <OptionGrid
          name="capital_range"
          value={fields.capital_range}
          onChange={set("capital_range")}
          options={[
            { value: "under_1k",  label: "Under £1,000" },
            { value: "1k_3k",     label: "£1,000 – £3,000" },
            { value: "3k_5k",     label: "£3,000 – £5,000" },
            { value: "5k_10k",    label: "£5,000 – £10,000" },
            { value: "over_10k",  label: "Over £10,000" },
          ]}
        />
      </div>

      <div>
        <Label>Hours per week you can commit</Label>
        <OptionGrid
          name="weekly_hours"
          value={fields.weekly_hours}
          onChange={set("weekly_hours")}
          cols={2}
          options={[
            { value: "2_5",      label: "2–5 hrs",  sub: "A few evenings" },
            { value: "5_10",     label: "5–10 hrs", sub: "Evenings + weekends" },
            { value: "10_20",    label: "10–20 hrs", sub: "Part-time effort" },
            { value: "20_plus",  label: "20+ hrs",  sub: "Serious commitment" },
          ]}
        />
      </div>

      <div>
        <Label>Previous experience with buying / selling</Label>
        <OptionGrid
          name="experience"
          value={fields.experience}
          onChange={set("experience")}
          options={[
            { value: "none",        label: "None", sub: "Complete beginner" },
            { value: "some",        label: "Some", sub: "Bought/sold before" },
            { value: "experienced", label: "Experienced", sub: "Done it multiple times" },
          ]}
        />
      </div>
    </div>,

    // ── Step 2: Goals ─────────────────────────────────────
    <div key="step2" className="space-y-6">
      <div>
        <Label>What&apos;s your primary goal?</Label>
        <OptionGrid
          name="goal"
          value={fields.goal}
          onChange={set("goal")}
          options={[
            { value: "side_income",     label: "Extra side income",     sub: "On top of my job" },
            { value: "replace_income",  label: "Replace income",        sub: "Full or part of my salary" },
            { value: "grow_savings",    label: "Grow savings",          sub: "Reinvest profits" },
            { value: "hobby",           label: "Learning & hobby",      sub: "Enjoy the process" },
          ]}
        />
      </div>

      <div>
        <Label>Target monthly profit</Label>
        <OptionGrid
          name="target_monthly"
          value={fields.target_monthly}
          onChange={set("target_monthly")}
          cols={3}
          options={[
            { value: "500_1k",   label: "£500–£1k" },
            { value: "1k_2k",    label: "£1k–£2k" },
            { value: "2k_5k",    label: "£2k–£5k" },
            { value: "5k_plus",  label: "£5k+" },
            { value: "unsure",   label: "Not sure" },
          ]}
        />
      </div>

      <div>
        <Label>Anything specific you want help with? <span className="font-normal text-white/30">(optional)</span></Label>
        <Textarea
          name="notes"
          value={fields.notes}
          onChange={set("notes")}
          placeholder="e.g. Finding cars in my area, understanding auction processes..."
        />
      </div>
    </div>,
  ];

  const isLast = step === STEPS.length - 1;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 py-16 text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[600px] rounded-full bg-[rgba(232,255,71,0.04)] blur-[120px]" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e8ff47]">
            Step {step + 1} of {STEPS.length}
          </p>
          <h1 className="font-syne text-2xl font-extrabold text-white md:text-3xl">
            {step === 0 && "Tell us about yourself"}
            {step === 1 && "Your situation"}
            {step === 2 && "What are you aiming for?"}
          </h1>
          <p className="mt-2 text-sm text-white/40">
            {step === 0 && "Helps us personalise your experience from day one."}
            {step === 1 && "We'll suggest cars and strategies that match your budget and time."}
            {step === 2 && "Set your target so we can track progress with you."}
          </p>
        </div>

        {/* Step progress */}
        <div className="mb-8 flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? "bg-[#e8ff47]" : "bg-white/8"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-white/7 bg-white/3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ x: direction * 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -40, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-6 md:p-8"
            >
              {stepContent[step]}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/6 px-6 py-4 md:px-8">
            {step > 0 ? (
              <button
                type="button"
                onClick={back}
                className="text-sm text-white/40 transition hover:text-white/70"
              >
                ← Back
              </button>
            ) : (
              <span />
            )}

            {isLast ? (
              <form action={action}>
                {/* Hidden fields */}
                <input type="hidden" name="email"         value={email} />
                <input type="hidden" name="name"          value={fields.name} />
                <input type="hidden" name="age_range"     value={fields.age_range} />
                <input type="hidden" name="employment"    value={fields.employment} />
                <input type="hidden" name="capital_range" value={fields.capital_range} />
                <input type="hidden" name="weekly_hours"  value={fields.weekly_hours} />
                <input type="hidden" name="experience"    value={fields.experience} />
                <input type="hidden" name="goal"          value={fields.goal} />
                <input type="hidden" name="target_monthly" value={fields.target_monthly} />
                <input type="hidden" name="notes"         value={fields.notes} />

                {state.error && (
                  <p className="mb-3 text-sm text-red-400">{state.error}</p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-xl bg-[#e8ff47] px-8 py-3 text-sm font-bold text-[#0a0a0a] transition hover:brightness-110 disabled:opacity-60 active:scale-95"
                >
                  {pending ? "Saving…" : "Finish →"}
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={next}
                className="rounded-xl bg-[#e8ff47] px-8 py-3 text-sm font-bold text-[#0a0a0a] transition hover:brightness-110 active:scale-95"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/25">
          This takes about 60 seconds. Your answers help us send you relevant tips only.
        </p>
      </div>
    </div>
  );
}
