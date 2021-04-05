import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "fury-toolbar-user",
  templateUrl: "./toolbar-user.component.html",
  styleUrls: ["./toolbar-user.component.scss"],
})
export class ToolbarUserComponent implements OnInit {
  isOpen: boolean;


  constructor(public authService: AuthService,) {
    this.checkRefresh();
  }

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

  private checkRefresh = () => {
    
    if(localStorage.getItem('REFRESH_APP') !==  'FALSE'){
      localStorage.setItem('REFRESH_APP','FALSE'); 
      window.location.reload();
    }else{
      localStorage.setItem('REFRESH_APP', null);
    }
  }

 


}
