// amplitude.ts
"use client";

import * as amplitude from "@amplitude/unified";

async function initAmplitude() {
  await amplitude.initAll("1152ebf26fab61a195d50e2c603199bb", {
    analytics: {
      autocapture: true,
    },
  });
}

if (typeof window !== "undefined") {
  initAmplitude();
}

export const Amplitude = () => null;

export default amplitude;
