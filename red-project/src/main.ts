import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { AnalyticsService } from "./app/shared/analytics.service";

bootstrapApplication(AppComponent, {
  providers: [AnalyticsService,]
});