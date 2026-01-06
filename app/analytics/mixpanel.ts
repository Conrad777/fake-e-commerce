import mixpanel from "mixpanel-browser";

export const initMixpanel = () => {
  mixpanel.init("9b92cafdb70b59326f022bf54df1f553", {
    autocapture: true,
    record_sessions_percent: 100,
    api_host: "https://api-eu.mixpanel.com",
  });
};
