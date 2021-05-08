

export class Permissions {

    public CAN_VIEW_ALL:boolean;
    public CAN_CREATE:boolean;
    public CAN_EDIT:boolean;
    public CAN_FILTER:boolean;
    public CAN_DOWNLOAD:boolean;
    public CAN_VIEW_DETAIL:boolean;
    public CAN_REFUND:boolean;
    private permittedUser:any = localStorage.getItem('userData');

    constructor(public entity:string){
        
        const userTasks = JSON.parse(localStorage.getItem('USER_TASKS')) || [];
        this.permittedUser = this.permittedUser ? JSON.parse(this.permittedUser) : null;
        const isAdmin = (this.permittedUser && !this.permittedUser?.merchantId); // we should apply this to super admin only
        const isPermitted = (action:string):boolean => { //closure
            // return true;
           return  !!userTasks.filter((task) => ( (task.moduleName == entity) && (task.action == action) ) 
            || isAdmin  //we should apply this to super admin only
           ).length;
        }
          this.CAN_VIEW_ALL = isPermitted("CAN_VIEW_ALL");
          this.CAN_CREATE = isPermitted("CAN_CREATE");
          this.CAN_EDIT = isPermitted("CAN_EDIT");
          this.CAN_FILTER = isPermitted("CAN_FILTER");
          this.CAN_DOWNLOAD = isPermitted("CAN_DOWNLOAD");
          this.CAN_VIEW_DETAIL = isPermitted("CAN_VIEW_DETAIL");
          this.CAN_REFUND = isPermitted("CAN_REFUND");



    }

}