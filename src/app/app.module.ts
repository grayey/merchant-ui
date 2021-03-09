import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // Needed for Touch functionality of Material Components
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "./layout/layout.module";
import { PendingInterceptorModule } from "../@fury/shared/loading-indicator/pending-interceptor.module";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
} from "@angular/material/snack-bar";
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AppService } from "../services/app.service";
import { AuthGuard } from "../services/auth-guard.service";
import { AuthService } from "../services/auth.service";
import { ApiHandlerService } from "../services/api-handler.service";
import { ApiInterceptorService } from "../services/api-interceptor.service";
import { ReportsService } from "../services/reports/reports.service";
import { ToastrModule } from "ngx-toastr";
import { UserService } from "../services/user/user.service";
import { MerchantService } from "src/services/merchant/merchant.service";

@NgModule({
  imports: [
    // Angular Core Module // Don't remove!
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({ preventDuplicates: true }),

    // Fury Core Modules
    AppRoutingModule,

    // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
    LayoutModule,

    // Displays Loading Bar when a Route Request or HTTP Request is pending
    PendingInterceptorModule,
    MatDialogModule,
    // Register a Service Worker (optional)
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "fill",
      } as MatFormFieldDefaultOptions,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: "end",
        verticalPosition: "bottom",
      } as MatSnackBarConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    AppService,
    AuthGuard,
    AuthService,
    ApiHandlerService,
    UserService,
    ReportsService,
    MerchantService,

  ],
})
export class AppModule {}
