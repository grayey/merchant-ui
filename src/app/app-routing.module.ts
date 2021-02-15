import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./pages/authentication/login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/authentication/register/register.module").then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import(
        "./pages/authentication/forgot-password/forgot-password.module"
      ).then((m) => m.ForgotPasswordModule),
  },
  {
    path: "coming-soon",
    loadChildren: () =>
      import("./pages/coming-soon/coming-soon.module").then(
        (m) => m.ComingSoonModule
      ),
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        pathMatch: "full",
      },
      {
        path: "apps/inbox",
        loadChildren: () =>
          import("./pages/apps/inbox/inbox.module").then((m) => m.InboxModule),
      },
      {
        path: "apps/calendar",
        loadChildren: () =>
          import("./pages/apps/calendar/calendar.module").then(
            (m) => m.CalendarAppModule
          ),
      },
      {
        path: "apps/chat",
        loadChildren: () =>
          import("./pages/apps/chat/chat.module").then((m) => m.ChatModule),
      },
      {
        path: "components",
        loadChildren: () =>
          import("./pages/components/components.module").then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: "forms/form-elements",
        loadChildren: () =>
          import("./pages/forms/form-elements/form-elements.module").then(
            (m) => m.FormElementsModule
          ),
      },
      {
        path: "forms/form-wizard",
        loadChildren: () =>
          import("./pages/forms/form-wizard/form-wizard.module").then(
            (m) => m.FormWizardModule
          ),
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./pages/icons/icons.module").then((m) => m.IconsModule),
      },
      {
        path: "page-layouts",
        loadChildren: () =>
          import("./pages/page-layouts/page-layouts.module").then(
            (m) => m.PageLayoutsModule
          ),
      },
      {
        path: "maps/google-maps",
        loadChildren: () =>
          import("./pages/maps/google-maps/google-maps.module").then(
            (m) => m.GoogleMapsModule
          ),
      },
      {
        path: "transactions",
        loadChildren: () =>
          import(
            "./pages/transactions/transactions-table/transactions-table.module"
          ).then((m) => m.TransactionsTableModule),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./pages/users/users-table/users-table.module").then(
            (m) => m.UsersTableModule
          ),
      },
      {
        path: "uploads",
        loadChildren: () =>
          import("./pages/uploads/uploads/uploads-table.module").then(
            (m) => m.UploadsTableModule
          ),
      },
      {
        path: "settlements",
        loadChildren: () =>
          import(
            "./pages/settlements/settlements/settlements-table.module"
          ).then((m) => m.SettlementsTableModule),
      },
      {
        path: "charge-backs",
        loadChildren: () =>
          import(
            "./pages/charge-backs/charge-backs/charge-backs-table.module"
          ).then((m) => m.ChargeBacksTableModule),
      },      
      {
        path: "reports",
        loadChildren: () =>
          import(
            "./pages/reports/reports.module"
          ).then((m) => m.ReportsModule),
      },
      {
        path: "drag-and-drop",
        loadChildren: () =>
          import("./pages/drag-and-drop/drag-and-drop.module").then(
            (m) => m.DragAndDropModule
          ),
      },
      {
        path: "editor",
        loadChildren: () =>
          import("./pages/editor/editor.module").then((m) => m.EditorModule),
      },
      {
        path: "blank",
        loadChildren: () =>
          import("./pages/blank/blank.module").then((m) => m.BlankModule),
      },
      {
        path: "level1/level2/level3/level4/level5",
        loadChildren: () =>
          import("./pages/level5/level5.module").then((m) => m.Level5Module),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
