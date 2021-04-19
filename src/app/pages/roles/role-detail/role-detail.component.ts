import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { processErrors } from "src/utils/helpers";
import { AppService } from "src/services/app.service";
import { APP_TASKS } from "src/appTasks";
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'fury-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  public viewedRole: any;
  public allTasks: any[] = [];
  public allTaskIds: string[] = [];
  public assignedTasks: any[] = [];
  public assignedTaskIds: string[] = [];
  public allChecked = false;
  private roleId = null;
  public messages = {
    create:"Save"
  }
  public loaders = {
    processing:false
  }

  constructor(private _activeRoute:ActivatedRoute,  private appService:AppService, private toaster:ToastrService, ) {

    this.allTasks = this.getAllTasks();
    
     
  }

  ngOnInit(): void {
    this.getUserRoleById();
  }


  public toggleAll() {
    this.assignedTaskIds = [];
    this.allChecked = !this.allChecked;
    if (!this.allChecked) {
      return;
    }
    const allTaskIds = this.pluckTaskIds(this.allTasks);
    this.assignedTaskIds = this.assignedTaskIds.concat(allTaskIds);
  
  }

  private setAllCheckedStatus() {
    this.allChecked = this.assignedTaskIds.length === this.allTasks.length;

  }

  private async getUserRoleById(){
    this._activeRoute.params.subscribe((param) => {
      this.roleId = param['id'];
      this.appService.getUserRoleById(this.roleId).subscribe(
        (roleResponse) => {
          this.viewedRole = roleResponse.data;
          const assignedTasks = this.viewedRole.roleFunctionsJson || "[]";
          this.assignedTasks = JSON.parse(assignedTasks);
          this.assignedTaskIds = this.assignedTasks.map(assignedTask => assignedTask.pseudoId);
          this.setAllCheckedStatus();
        },
        (error) => {
          this.toaster.error(processErrors(error));
        });
    });
  }

  private pluckTaskIds(tasks) {
    return tasks.map((task) => {
      return task.pseudoId;
    });
  }

  public setSelection(taskId) {
    if(!taskId) return;

    if (this.assignedTaskIds.includes(taskId)) {
      this.assignedTaskIds = this.assignedTaskIds.filter((id) => {
        return id !== taskId;
      });
    } else {
      this.assignedTaskIds.push(taskId);
    }
    this.setAllCheckedStatus();
  }

  public saveAssigment() {
    this.loaders.processing = true;
    const assignedTasks = this.allTasks.filter((task) => { 
      task.functionName = task.moduleName;
     return this.assignedTaskIds.includes(task?.pseudoId)
    });
    this.appService.assignTasksToRole(+this.roleId, assignedTasks).subscribe(
      (assignmentResponse) => {
        this.loaders.processing = false;
        this.toaster.success(`Tasks for ${this.viewedRole?.name} successfully updated.`)
      },
      (error) => {
        this.loaders.processing = false;
        this.toaster.error(processErrors(error));
      },
      () =>{
      });

    console.log({ assignedTasks })

  }

  public getAllTasks = ()=>{
  const merchantId = this.appService.getMerchantId();
   const allTasks = [];
   const mapTasks = (tasks, parentModule=null) => { //closure
    tasks.forEach((task) =>{
      const {actions, functionType, functionName, subModules} = task;
        if(actions){
           actions.map((action)=>{
             const pseudoId = `${functionName}-${action}`;
             this.allTaskIds.push(pseudoId);
            allTasks.push(
              {
                pseudoId,
                displayName:action?.split('_')?.join(' '),
                moduleName:functionName,
                parentModule,
                action,
                functionType
              }
            ) 
          })
        }
        else{
          mapTasks(subModules, functionName);
        }
      
      })
   }
   
    mapTasks(APP_TASKS.filter(task =>  merchantId ? task.functionType !== "ADMIN" : true));
    return allTasks;

    
  }

}
