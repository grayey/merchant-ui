import { DOCUMENT } from "@angular/common";
import { Component, OnDestroy, OnInit, Inject, ViewChild } from '@angular/core';
import { SidebarDirective } from '../../@fury/shared/sidebar/sidebar.directive';
import { SidenavService } from './sidenav/sidenav.service';
import { filter, map, startWith } from 'rxjs/operators';
import { ThemeService } from '../../@fury/services/theme.service';
import { AuthService } from "src/services/auth.service";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { checkRouterChildsData } from '../../@fury/utils/check-router-childs-data';
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'fury-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('configPanel', { static: true }) configPanel: SidebarDirective;

  private intervalTimer;
  private maxInactiveTime = environment.MAX_INACTIVE_TIME;
  private notifyInactivity = environment.NOTIFY_INACTIVITY;
  private idleTime = 0;
  public showInactivityBanner:boolean = false;
  public timeDifference:number;

  sidenavOpen$ = this.sidenavService.open$;
  sidenavMode$ = this.sidenavService.mode$;
  sidenavCollapsed$ = this.sidenavService.collapsed$;
  sidenavExpanded$ = this.sidenavService.expanded$;
  quickPanelOpen: boolean;

  sideNavigation$ = this.themeService.config$.pipe(map(config => config.navigation === 'side'));
  topNavigation$ = this.themeService.config$.pipe(map(config => config.navigation === 'top'));
  toolbarVisible$ = this.themeService.config$.pipe(map(config => config.toolbarVisible));
  toolbarPosition$ = this.themeService.config$.pipe(map(config => config.toolbarPosition));
  footerPosition$ = this.themeService.config$.pipe(map(config => config.footerPosition));

  scrollDisabled$ = this.router.events.pipe(
    filter<NavigationEnd>(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.scrollDisabled))
  );

  constructor(private sidenavService: SidenavService,
              private themeService: ThemeService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private toasterService:ToastrService,
              @Inject(DOCUMENT) private document: Document,) {}

  ngOnInit() {
    this.inactivityTimer();

  }

  openQuickPanel() {
    this.quickPanelOpen = true;
  }

  openConfigPanel() {
    this.configPanel.open();
  }

  closeSidenav() {
    this.sidenavService.close();
  }

  openSidenav() {
    this.sidenavService.open();
  }

  private resetTimer  = () => {
    this.idleTime = 0; 
    clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(this.checkInactiveLogout, 1000);    
}

private checkInactiveLogout = () => {
  this.idleTime += 1000;
  this.showInactivityBanner = false;
  this.timeDifference = this.maxInactiveTime - this.idleTime;
  if(this.timeDifference <= 0){
    this.logout();
    !this.document.getElementById('login_page') && this.toasterService.error('You were logged out due to inactivity.');
  }else if(this.timeDifference <= this.notifyInactivity){
    this.showInactivityBanner = true;
  }

}



private inactivityTimer = () => {
  this.resetTimer();
  this.document.onclick = this.resetTimer;
  this.document.onkeypress = this.resetTimer;
  this.document.ontouchstart = this.resetTimer;
}

private logout() {
  this.authService.logoutUser(this.intervalTimer);
  console.log("Log:", this.intervalTimer)

}

  ngOnDestroy(): void {
    clearInterval(this.intervalTimer);
  }
}

