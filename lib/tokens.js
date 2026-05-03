// Color experiment branch — light blue replacing ink, light green replacing ember.
// Do not merge to main without explicit founder approval.
export const tokens = {
  ink: "#6E8FA3",       // light steel blue (was #181614)
  paper: "#F5F4F0",     // default = cool variant; switcher overrides via [data-paper]
  paperDeep: "#ECEAE3",
  paperWarm: "#E8E5DD",
  ember: "#82A769",     // soft sage (was #D4471C)
  emberDeep: "#5C7E4B", // darker sage (was #A8330F)
  emberWarm: "#9DBE89", // lighter sage (was #E86A40)
  muted: "#8A857E",
  mutedDeep: "#5C5851",
};

export const easing = "cubic-bezier(0.32, 0.72, 0, 1)";
export const easingArr = [0.32, 0.72, 0, 1];

export function getHeatColor(pct) {
  if (pct > 80) return tokens.ember;
  if (pct > 40) return tokens.emberWarm;
  return tokens.muted;
}
