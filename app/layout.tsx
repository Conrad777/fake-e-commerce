"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import { PostHogProvider } from "./analytics/posthog";
import { Amplitude } from "./analytics/amplitude";

import Script from "next/script";
import { useEffect, useId } from "react";
import { initMixpanel } from "./analytics/mixpanel";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heapScriptId = useId();
  const csqScriptId = useId();

  useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);

  return (
    <html lang="en">
      <Amplitude />
      <head>
        <Script
          id={heapScriptId}
          dangerouslySetInnerHTML={{
            __html: `
						window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{},window.heap.clientConfig.shouldFetchServerConfig=!1;var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r);var n=["init","startTracking","stopTracking","track","resetIdentity","identify","getSessionId","getUserId","getIdentity","addUserProperties","addEventProperties","removeEventProperty","clearEventProperties","addAccountProperties","addAdapter","addTransformer","addTransformerFn","onReady","addPageviewProperties","removePageviewProperty","clearPageviewProperties","trackPageview"],i=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);window.heapReadyCb.push({name:e,fn:function(){heap[e]&&heap[e].apply(heap,t)}})}};for(var p=0;p<n.length;p++)heap[n[p]]=i(n[p])};
						heap.load("3605744716");
						`,
          }}
        />
      </head>
      <body className={inter.className}>
        <Script
          id={csqScriptId}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
							window._uxa = window._uxa || [];
							if (typeof CS_CONF === "undefined") {
							window._uxa.push([
								"setPath",
								window.location.pathname + window.location.hash.replace("#", "?__"),
							]);
							var mt = document.createElement("script");
							mt.type = "text/javascript";
							mt.async = true;
							mt.src = "//t.contentsquare.net/uxa/a1596f087dce6.js";
							document.getElementsByTagName("head")[0].appendChild(mt);
							} else {
							window._uxa.push([
								"trackPageview",
								window.location.pathname + window.location.hash.replace("#", "?__"),
							]);
							}
						})();
						`,
          }}
        />

        <PostHogProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
