<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Brand tokens and type/spacing utilities (text-display, text-section, text-label, container-page, section-pad, glass, hairline) live in src/styles.css; use them instead of raw values — keeps the design system single-sourced.
- Landing page sections are ids on src/routes/index.tsx; shared UI primitives (Button, Eyebrow, Reveal, SectionHeading) in src/components/site/primitives.tsx — later prompts fill sections in place.
