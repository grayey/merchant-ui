import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "fury-toolbar-user",
  templateUrl: "./toolbar-user.component.html",
  styleUrls: ["./toolbar-user.component.scss"],
})
export class ToolbarUserComponent implements OnInit {
  isOpen: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    //console.log(this.authService.user);
  }

  logout() {
    this.authService.logoutUser();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }
}
