// amplitude.ts
"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

function initAmplitude() {
  if (typeof window !== "undefined") {
    amplitude.add(sessionReplayPlugin());
    amplitude.init("3f0d93a94af6587f106bbbe0eb4a5fc0", { autocapture: true });
  }
}

initAmplitude();

export const Amplitude = () => null;
export default amplitude;
