export const tokens = {
  ink: "#5A85A0",
  paper: "#F5F4F0",
  paperDeep: "#ECEAE3",
  paperWarm: "#E8E5DD",
  ember: "#D06A48",
  emberDeep: "#A85332",
  emberWarm: "#E08A6B",
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
