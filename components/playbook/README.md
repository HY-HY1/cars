# Playbook Component System

All components live in `components/playbook/playbook-layout.tsx`.  
Import what you need and compose a lesson page.

---

## Route structure

Each module is a page under the dashboard:

```
app/dashboard/playbook/page.tsx          ← overview / module list (existing)
app/dashboard/playbook/m1/page.tsx       ← Module 1 lesson
app/dashboard/playbook/m2/page.tsx       ← Module 2 lesson
...
```

Create `app/dashboard/playbook/m1/page.tsx` (and so on) for each module.  
Every lesson page should import from the component system and is a **server component** by default.

---

## Minimal lesson template

```tsx
import {
  PlaybookLesson,
  LessonHeader,
  LessonVideo,
  LessonSection,
  LessonBody,
  LessonNavigation,
} from "@/components/playbook/playbook-layout";

export const metadata = { title: "Module 1 — Car Flipping Playbook" };

export default function Module1Page() {
  return (
    <PlaybookLesson>
      <LessonHeader
        module="01"
        tag="Start here"
        title="Welcome & Orientation"
        duration="12 min"
        description="What to expect, how the system works, and how to get the most out of this playbook."
      />

      <LessonVideo
        source={{ type: "youtube", id: "YOUR_VIDEO_ID" }}
        caption="Module 1 introduction"
      />

      <LessonSection number={1} title="How this playbook is structured">
        <LessonBody>Write your prose here...</LessonBody>
      </LessonSection>

      <LessonNavigation
        next={{ title: "Finding Undervalued Cars", href: "/dashboard/playbook/m2" }}
      />
    </PlaybookLesson>
  );
}
```

---

## Component reference

---

### `<PlaybookLesson>`

The outer page wrapper. Every lesson starts with this.

```tsx
<PlaybookLesson>
  {/* all lesson content */}
</PlaybookLesson>
```

---

### `<LessonHeader>`

Renders the module badge, tag, title, duration and optional description.

| Prop          | Type         | Required | Notes                                      |
|---------------|--------------|----------|--------------------------------------------|
| `module`      | `string`     | ✓        | e.g. `"02"` — shown as "Module 02"         |
| `tag`         | `LessonTag`  | ✓        | `"Start here"` `"Core"` `"Advanced"` `"Essential"` `"Bonus"` |
| `title`       | `string`     | ✓        |                                            |
| `duration`    | `string`     | ✓        | e.g. `"34 min"`                            |
| `description` | `string`     |          | One-sentence summary shown below the title |

```tsx
<LessonHeader
  module="02"
  tag="Core"
  title="Finding Undervalued Cars"
  duration="34 min"
  description="Learn how to find deals that others scroll past."
/>
```

---

### `<LessonVideo>`

Embeds a video in a 16:9 responsive frame. Supports four source types.

| `source.type` | Required field | Example                              |
|---------------|----------------|--------------------------------------|
| `"youtube"`   | `id`           | `{ type: "youtube", id: "abc123" }`  |
| `"vimeo"`     | `id`           | `{ type: "vimeo", id: "123456" }`    |
| `"loom"`      | `id`           | `{ type: "loom", id: "abc123" }`     |
| `"url"`       | `src`          | `{ type: "url", src: "/video.mp4" }` |

| Prop       | Type           | Notes                   |
|------------|----------------|-------------------------|
| `source`   | `VideoSource`  | ✓                       |
| `caption`  | `string`       | Shown below the video   |
| `className`| `string`       |                         |

```tsx
// YouTube
<LessonVideo source={{ type: "youtube", id: "dQw4w9WgXcQ" }} />

// Loom with caption
<LessonVideo
  source={{ type: "loom", id: "your-loom-id" }}
  caption="Live walkthrough of the AutoTrader search process"
/>

// Self-hosted
<LessonVideo source={{ type: "url", src: "/videos/module-2.mp4" }} />
```

---

### `<LessonSection>`

A major numbered content block. Use for each distinct topic within a lesson.

| Prop       | Type              | Notes                                              |
|------------|-------------------|----------------------------------------------------|
| `number`   | `number`          | Optional. Shown as `01`, `02`... on the left       |
| `title`    | `string`          | ✓                                                  |
| `children` | `React.ReactNode` | ✓                                                  |

```tsx
<LessonSection number={1} title="Where to look">
  <LessonBody>AutoTrader is the UK's largest car marketplace...</LessonBody>
</LessonSection>
```

---

### `<LessonSubSection>`

A sub-heading within a section for grouping related content.

```tsx
<LessonSection number={1} title="Where to look">
  <LessonSubSection title="AutoTrader">
    <LessonBody>Best for volume...</LessonBody>
  </LessonSubSection>
  <LessonSubSection title="Facebook Marketplace">
    <LessonBody>Best for private sellers in a hurry...</LessonBody>
  </LessonSubSection>
</LessonSection>
```

---

### `<LessonBody>`

Standard prose paragraph. Chain multiple for multi-paragraph text.

```tsx
<LessonBody>The UK used car market has over 7 million transactions per year...</LessonBody>
<LessonBody>The key is not which platform you use, but how you search...</LessonBody>
```

---

### `<LessonList>`

A bulleted or numbered list.

| Prop      | Type               | Notes                            |
|-----------|--------------------|----------------------------------|
| `items`   | `React.ReactNode[]`| ✓                                |
| `ordered` | `boolean`          | Default `false` (bullets)        |

```tsx
// Bulleted
<LessonList items={[
  "AutoTrader — highest volume",
  "Facebook Marketplace — private sellers, cash deals",
  "Gumtree — older stock, less competition",
]} />

// Numbered
<LessonList ordered items={[
  "Check the V5C matches the seller",
  "Run an HPI check before offering",
  "View in daylight only",
]} />
```

---

### `<LessonChecklist>`

Items with a green tick icon. Good for "before you go" or "don't forget" lists.

```tsx
<LessonChecklist items={[
  "Print the inspection checklist",
  "Bring a torch for under the car",
  "Have the HPI check ready on your phone",
  "Know your maximum offer before you arrive",
]} />
```

---

### `<LessonSteps>`

A numbered step-by-step process. Each step has a title and optional description.

```tsx
<LessonSteps steps={[
  {
    title: "Open AutoTrader and set your location",
    description: "Use your home postcode with a 30-mile radius to start.",
  },
  {
    title: "Filter to private sellers only",
    description: "Dealers add markup. Private sellers are more negotiable.",
  },
  {
    title: "Sort by newest first",
    description: "Fresh listings get the most competition — act fast.",
  },
]} />
```

---

### `<LessonCallout>`

A highlighted callout box. Four variants:

| Variant     | Colour | Use for                                   |
|-------------|--------|-------------------------------------------|
| `"tip"`     | Green  | Pro advice, shortcuts, things that help   |
| `"warning"` | Amber  | Mistakes to avoid, red flags, risks       |
| `"info"`    | Blue   | Background context, definitions, FYI      |
| `"key"`     | Yellow | The single most important point in a block|

```tsx
<LessonCallout variant="tip" title="Pro tip">
  Listings with fewer than 5 photos almost always have something to hide. Skip them.
</LessonCallout>

<LessonCallout variant="warning" title="Common mistake">
  Never transfer money before you've seen the car in person.
</LessonCallout>

<LessonCallout variant="info">
  An HPI check costs around £10 and confirms no outstanding finance or write-off history.
</LessonCallout>

<LessonCallout variant="key">
  You make your money when you buy the car, not when you sell it.
</LessonCallout>
```

---

### `<LessonImage>`

A full-width image with optional caption. Images should go in `public/images/`.

| Prop          | Type     | Notes                                          |
|---------------|----------|------------------------------------------------|
| `src`         | `string` | ✓ Path from `/public`, e.g. `/images/m2/autotrader.png` |
| `alt`         | `string` | ✓ Describe the image                           |
| `caption`     | `string` | Shown below                                    |
| `aspectRatio` | `"video"` `"square"` `"wide"` `"auto"` | Default: `"video"` (16:9) |

```tsx
<LessonImage
  src="/images/m2/autotrader-search.png"
  alt="AutoTrader search page with price and mileage filters applied"
  caption="Set these exact filters to surface undervalued stock"
/>
```

---

### `<LessonImageGrid>`

Side-by-side images. Use `cols={2}` for comparisons, `cols={3}` for examples.

```tsx
// Before / after
<LessonImageGrid
  cols={2}
  images={[
    { src: "/images/m5/before-valet.jpg", alt: "Car before valet", caption: "Before" },
    { src: "/images/m5/after-valet.jpg",  alt: "Car after valet",  caption: "After" },
  ]}
/>

// Three listing examples
<LessonImageGrid
  cols={3}
  images={[
    { src: "/images/m5/listing-bad.png",    alt: "Bad listing example"    },
    { src: "/images/m5/listing-average.png", alt: "Average listing example" },
    { src: "/images/m5/listing-good.png",   alt: "Good listing example"   },
  ]}
/>
```

---

### `<LessonQuote>`

A pull quote — a short, memorable rule or principle.

```tsx
<LessonQuote attribution="Module 2 — core principle">
  You make your money when you buy the car, not when you sell it.
</LessonQuote>
```

---

### `<LessonKeyTakeaway>`

A summary box — use at the end of a section to reinforce the main point.

```tsx
<LessonKeyTakeaway>
  Always view cars in daylight. Artificial lighting masks paint defects, rust,
  and poor bodywork repairs.
</LessonKeyTakeaway>
```

---

### `<LessonResource>` and `<LessonResourceGroup>`

Downloadable files or external links. Place in a `LessonResourceGroup` with a heading.

Resource `type` options: `"pdf"` `"spreadsheet"` `"template"` `"checklist"` `"link"`

```tsx
<LessonResourceGroup title="Downloads for this module">
  <LessonResource
    title="40-Point Inspection Checklist"
    description="Print before every viewing"
    href="/downloads/inspection-checklist.pdf"
    type="checklist"
  />
  <LessonResource
    title="Profit Calculator"
    description="Estimate your margin before you buy"
    href="/downloads/profit-calculator.xlsx"
    type="spreadsheet"
  />
  <LessonResource
    title="HPI Check — recommended provider"
    href="https://www.hpicheck.com"
    type="link"
    external
  />
</LessonResourceGroup>
```

---

### `<LessonDivider>`

A subtle horizontal rule. Use between content blocks that don't need a full `LessonSection` heading.

```tsx
<LessonDivider />
```

---

### `<LessonNavigation>`

Prev/next lesson links. Place at the very bottom of every lesson page.

```tsx
<LessonNavigation
  prev={{ title: "Welcome & Orientation", href: "/dashboard/playbook/m1" }}
  next={{ title: "Evaluating Before You Buy", href: "/dashboard/playbook/m3" }}
/>

// First lesson — no prev
<LessonNavigation
  next={{ title: "Finding Undervalued Cars", href: "/dashboard/playbook/m2" }}
/>

// Last lesson — no next
<LessonNavigation
  prev={{ title: "Legal & Compliance", href: "/dashboard/playbook/m7" }}
/>
```

---

## Full example lesson

```tsx
import {
  PlaybookLesson,
  LessonHeader,
  LessonVideo,
  LessonSection,
  LessonSubSection,
  LessonBody,
  LessonList,
  LessonChecklist,
  LessonSteps,
  LessonCallout,
  LessonImage,
  LessonQuote,
  LessonKeyTakeaway,
  LessonResourceGroup,
  LessonResource,
  LessonNavigation,
} from "@/components/playbook/playbook-layout";

export default function Module2Page() {
  return (
    <PlaybookLesson>
      <LessonHeader
        module="02"
        tag="Core"
        title="Finding Undervalued Cars"
        duration="34 min"
        description="The exact search process for finding cars priced below their real market value."
      />

      <LessonVideo
        source={{ type: "youtube", id: "YOUR_VIDEO_ID" }}
        caption="Full sourcing walkthrough — 34 min"
      />

      <LessonSection number={1} title="Where to look">
        <LessonBody>
          Three platforms account for the majority of UK private car sales...
        </LessonBody>

        <LessonSubSection title="AutoTrader">
          <LessonBody>Largest volume. Best filters. Start here.</LessonBody>
        </LessonSubSection>

        <LessonSubSection title="Facebook Marketplace">
          <LessonBody>Private sellers who want a quick sale. Less competition.</LessonBody>
          <LessonCallout variant="tip" title="Pro tip">
            Search "quick sale" or "need gone" to find motivated sellers.
          </LessonCallout>
        </LessonSubSection>
      </LessonSection>

      <LessonSection number={2} title="How to search">
        <LessonSteps steps={[
          { title: "Set your location and radius to 30 miles" },
          { title: "Filter to private sellers only" },
          { title: "Sort by newest listings" },
          { title: "Flag anything priced 15%+ below book value" },
        ]} />

        <LessonImage
          src="/images/m2/autotrader-filters.png"
          alt="AutoTrader search filters"
          caption="These exact settings surface the deals worth calling about"
        />
      </LessonSection>

      <LessonQuote>
        You make your money when you buy the car, not when you sell it.
      </LessonQuote>

      <LessonKeyTakeaway>
        Run this search every morning. The best deals are listed and sold within 48 hours.
        Consistency beats cleverness.
      </LessonKeyTakeaway>

      <LessonResourceGroup title="Downloads">
        <LessonResource
          title="Daily Sourcing Checklist"
          href="/downloads/sourcing-checklist.pdf"
          type="checklist"
          description="Your daily routine, one page"
        />
      </LessonResourceGroup>

      <LessonNavigation
        prev={{ title: "Welcome & Orientation", href: "/dashboard/playbook/m1" }}
        next={{ title: "Evaluating Before You Buy", href: "/dashboard/playbook/m3" }}
      />
    </PlaybookLesson>
  );
}
```

---

## Image organisation

Store lesson images under `public/images/` grouped by module:

```
public/
  images/
    m1/   ← module 1 screenshots, diagrams
    m2/   ← module 2
    m3/
    ...
  downloads/
    inspection-checklist.pdf
    profit-calculator.xlsx
    negotiation-scripts.pdf
```

---

## Suggested component usage per module

| Module | Likely components                                                      |
|--------|------------------------------------------------------------------------|
| M1     | Video, Body, Steps, Callout (info), KeyTakeaway                        |
| M2     | Video, Section ×3, SubSection, Image, ImageGrid, Steps, Callout (tip) |
| M3     | Video, Steps, Checklist, Image (diagram), Callout (warning), Resource  |
| M4     | Video, Steps, Quote, Callout (key), List                               |
| M5     | Video, ImageGrid (before/after), Steps, Image, Callout (tip)           |
| M6     | Video, Steps, List, Callout (warning), Resource                        |
| M7     | Video, Section, Body, Callout (info), KeyTakeaway                      |
| M8     | Video, Section, Callout (warning), List, Resource (external links)     |
