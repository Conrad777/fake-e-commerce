// amplitude.ts
"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

function initAmplitude() {
  if (typeof window !== "undefined") {
    amplitude.add(sessionReplayPlugin());
    amplitude.init("3462e6ba34b482c87fea740beeb811f4", { autocapture: true });
  }
}

initAmplitude();

export const Amplitude = () => null;
export default amplitude;
