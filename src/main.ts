// NOTE: this import should be done before all other imports in your main file.
import SessionDebugger from "@multiplayer-app/session-debugger";

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

SessionDebugger.init({
  version: "0.1",
  application: "register-app",
  environment: "dev>",
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRlZ3JhdGlvbiI6IjY3YjBiZjM0ZmRlNmViMDUxMDUzMDdiMSIsIndvcmtzcGFjZSI6IjY3YWI4NzA5ZjZjNTlkZjQxMGUyN2E4YyIsInByb2plY3QiOiI2N2FlZmQxOGY2YzU5ZGY0MTBlMjhhZWMiLCJ0eXBlIjoiT1RFTCIsImlhdCI6MTczOTYzNjUzMn0.lNZ73jcUdEJ8eLwes68FQC-2JhLSAxWogJihVpYrmqA",
  canvasEnabled: true,
  showWidget: true,
  ignoreUrls: [
    /https:\/\/domain\.to\.ignore\/.*/, // can be regex or string
    /https:\/\/another\.domain\.to\.ignore\/.*/,
  ],
  // NOTE: if frontend domain doesn't match to backend one, set backend domain to `propagateTraceHeaderCorsUrls` parameter
  propagateTraceHeaderCorsUrls: [
    new RegExp("https://your.backend.api.domain", "i"), // can be regex or string
    new RegExp("https://another.backend.api.domain", "i")
  ],
  schemifyDocSpanPayload: true,
  maskDebSpanPayload: true,
  docTraceRatio: 0.15 // 15% of traces will be sent for auto-documentation
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
