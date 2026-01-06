// amplitude.ts
"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

function initAmplitude() {
  if (typeof window !== "undefined") {
    amplitude.add(sessionReplayPlugin());
    amplitude.init("1152ebf26fab61a195d50e2c603199bb", { autocapture: true });
  }
}

initAmplitude();

export const Amplitude = () => null;
export default amplitude;
