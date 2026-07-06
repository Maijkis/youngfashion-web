/**
 * Fixed paper-grain texture over the whole viewport — the "printed stock" cue
 * for the ISSUE 05 magazine treatment. Pure CSS (inline SVG feTurbulence
 * data-URI in globals.css `.grain`): no asset, no network request, and
 * pointer-events:none so it never intercepts interaction.
 */
export default function GrainOverlay() {
  return <div aria-hidden className="grain" />;
}
