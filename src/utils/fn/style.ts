import { withTiming, Easing } from "react-native-reanimated";

export const hexToRgbA = (hex, opacity) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join("")}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ","
    )},${opacity})`;
  }
  throw new Error("Bad Hex");
};

export const withCustomTiming = (i: number, duration = 500) => {
  "worklet";
  return withTiming(i, {
    easing: Easing.bezier(0.33, 1, 0.68, 1),
    duration,
  });
};
