import vars from "src/lib/vars";

export default function round(value: number) {
  const precision = vars.subtitlePrecision;
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
