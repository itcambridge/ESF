1\. Overall project brief (prompt for AI tools)

Build a modern, editorial‑style website inspired by the World Economic Forum homepage (weforum.org), not a copy. Focus on:



Clean, institutional look with lots of white space

Card‑based layout for articles and “Centres”/topic areas

Strong typography and clear hierarchy

Responsive design (desktop‑first, but works perfectly on mobile)

Accessible colour contrast and keyboard navigation

SEO‑friendly, fast‑loading pages

Use a modern frontend stack (React + Next.js or plain HTML/CSS/JS) and a simple content structure that can later connect to a CMS.





You can adapt:



If you want React/Next.js: “Use Next.js with TypeScript and Tailwind CSS.”

If you want plain HTML/CSS: “Generate static HTML, CSS, and minimal vanilla JavaScript. No build tools.”

2\. Information architecture (what sections to build)

Tell the AI tool to create these sections on the homepage:



Hero section



Tagline (1–2 lines) expressing your version of “connecting leaders / making sense of global challenges”.

Sub‑CTA links: e.g. “More about \[Your Org]”, “Watch full video”.

Optional background image or gradient, but subtle.

Upcoming flagship event / announcement



Horizontal banner with: event title, dates, location, and a “What to know” link.

Impact / How we work section



Short intro line (e.g. “How we drive impact”).

3–4 columns or cards: Centres / Programmes / Stakeholders / Meetings.

Centres / Focus areas grid



Grid of cards listing your key focus areas (like WEF’s 11 Centres). Each card:

Title

One‑sentence description

“Learn more” link.

Spotlight / Latest analysis



A section for latest stories/insights.

Horizontal cards with image, topic tag, title, short description, and read‑time or duration.

Discover by topic



Horizontal scroll or grid of key topics (e.g. Economic Growth, Climate, Technology, Regions…).

Each topic opens a topic page or filters stories.

Geographies in depth (optional)



Cards highlighting regional stories.

Newsletter sign‑up



Short block with headline, description, and email form.

Press / In the news



List of external links with source name.

Digital initiatives / programmes



2–3 feature cards for your flagship initiatives.

Footer

Columns: About, More from us, Engage, Quick links, Language selector, Legal.

Prompt snippet for the AI:



Implement a homepage with sections in this order: Hero, Event banner, Impact overview, Centres grid, Spotlight stories, Discover topics, Geographies, Newsletter signup, In the news, Digital initiatives, Footer.



Each section should be a separate component (if using React/Next.js) or a distinct <section> with an id (if using HTML).





3\. Visual design instructions (for AI)

Use something like this as a style prompt:



Design language:



Overall feel: serious, institutional, global, editorial.

Layout: wide content area, generous white space, clear section separation.

Colours: primary deep blue and dark gray for text; light grays for backgrounds; 1–2 accent colours for tags/buttons.

Typography: use a clean sans‑serif font (e.g. Inter, Source Sans Pro, or System UI).

Headings: bold, large; body text around 16–18px for readability.

Cards: subtle shadows or borders, rounded corners 4–8px, hover elevation.

Buttons: solid primary button + text/link style buttons. Minimal gradients, no flashy effects.

Icons: minimal, line icons where needed.



If using Tailwind, you can ask:



Configure Tailwind with a custom colour palette: primary, accent, neutral, and semantic colours for success, warning, etc. Apply consistent spacing scale (4, 8, 12, 16, 24, 32 px etc.).





4\. Technical stack templates

Option A – Next.js + Tailwind (good for growth)

Prompt to AI tool:



Create a new Next.js (App Router) project with TypeScript and Tailwind CSS.



Setup layout in app/layout.tsx with global header and footer.

Create app/page.tsx as the homepage assembling these sections as React components.

Put reusable UI in components/ (e.g. Hero.tsx, CentresGrid.tsx, StoryCard.tsx, NewsletterSection.tsx, Footer.tsx).

Use Tailwind utility classes for styling following the design language above.



Then, for each section, you can say:



Generate a Hero component for the homepage:



Add a background section with a main headline, subheadline, and two CTAs.

Layout: content centered in a max‑width container (max-w-6xl mx-auto px-4 py-16).

On desktop, headline text left‑aligned, optional illustrative image or video thumbnail on the right.

Fully responsive: stack vertically on mobile.



Repeat per section (Centres grid, Spotlight, etc.).



Option B – Static HTML/CSS (simpler, no framework)

Prompt to AI tool:



Create a responsive index.html with semantic sections and a separate styles.css file.



Use <header>, <main>, <section>, <article>, and <footer> appropriately.

Use CSS Flexbox and CSS Grid for layout.

Avoid heavy JavaScript; only use it for the mobile menu and simple interactive elements.

Ensure typography and spacing follow the design language above.



5\. Component breakdown

Header \& navigation



Build a sticky top navigation bar:



Left: logo / site name.

Center/right: main nav links (e.g. “Centres”, “Meetings”, “Stakeholders”, “Stories”).

Right: secondary actions (sign in, language selector, search icon).

On mobile: collapse links into a hamburger menu.



Hero section



Structure:



Large headline (2 lines max)

Short supporting copy (1–2 sentences)

Primary and secondary CTAs (buttons)

Optional small sub‑text like “More about the Forum” and “Watch full video”.



Centres / Focus grid



Build a responsive grid (2 columns on mobile, 3–4 on desktop) of cards. Each card has:



Title

1–2 line description

Small link or arrow icon for details.



Story / article cards



Reusable StoryCard component with:



Category label (e.g. “Circular Economy”, “Jobs and the Future of Work”)

Title (2–3 lines max)

Optional description / excerpt

Meta (author, date, or duration for videos)

On hover: elevate card slightly, maybe change border colour.



Newsletter section



Simple block with:



Title, description

Email input + submit button

Small privacy note.



Footer



Multi‑column footer with lists of links, plus language selection and copyright.





6\. Content model (for future CMS)

Instruct your AI tool to structure data as JSON or TypeScript types so you can later connect a CMS.



Example (for Next.js):



export type Centre = {

&nbsp; id: string;

&nbsp; name: string;

&nbsp; description: string;

&nbsp; slug: string;

};



export type Story = {

&nbsp; id: string;

&nbsp; title: string;

&nbsp; category: string;

&nbsp; summary: string;

&nbsp; slug: string;

&nbsp; publishedAt: string;

&nbsp; region?: string;

};

Then:



Render centres from a centres array.

Render stories from a stories array.

Prompt:



Don’t hard‑code repeated sections. Define TypeScript types and arrays (centres, latestStories, topics) and map over them to generate the UI.





7\. Performance \& accessibility requirements

Add this to your instructions:



Ensure good Core Web Vitals: optimize images, use lazy loading, and minimal blocking scripts.

Use descriptive <head> tags: title, meta description, open graph tags.

Accessible markup: proper heading hierarchy (H1, H2, etc.), aria-label on nav, labelled form elements.

Colour contrast must meet WCAG AA.

Test layout on mobile, tablet, and desktop breakpoints.



8\. A ready‑to‑paste master prompt

You can give this entire block to your AI coding tool:



I want to build a website with a similar style and structure to https://www.weforum.org/Opens a new window (World Economic Forum), but with my own branding and content.



Please:



Use Next.js with TypeScript and Tailwind CSS.

Set up a layout and homepage with these sections in order:

Sticky header and navigation

Hero section with headline, subheadline, 2 CTAs

Event banner section

Impact overview section (how we drive impact)

Centres / focus areas grid (at least 6–8 cards)

Spotlight / latest analysis stories (card layout)

Discover by topic section

Geographies / regional stories section

Newsletter sign‑up section

In the news (external links)

Digital initiatives / programmes

Footer with multi‑column links and language selector

Use a clean, institutional visual style: generous white space, a deep blue or navy primary colour, neutral grays, sans‑serif typography, card‑based layout, and subtle hover effects.

Make all sections responsive (mobile, tablet, desktop) and accessible (semantic HTML, proper headings, labelled forms).

Store repeated content (centres, stories, topics) in TypeScript arrays and map over them to render components.

Comment the code clearly so I can later swap in my own content.

Generate the initial project structure and the code for the homepage components.

