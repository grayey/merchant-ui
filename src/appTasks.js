
export const APP_TASKS = [
    {
      name:"Users",
      taskType:"ADMIN",
      actions:["CAN_VIEW_ALL", "CAN_CREATE", "CAN_EDIT","CAN_FILTER"]
    },
    {
      name:"Merchants",
      taskType:"ADMIN",
      actions:["CAN_VIEW_ALL", "CAN_CREATE", "CAN_EDIT","CAN_FILTER"]
    },
    {
      name:"Uploads",
      taskType:"ADMIN",
      actions:["CAN_VIEW_ALL", "CAN_CREATE", "CAN_VIEW_DETAIL","CAN_FILTER"]
    },
    {
      name:"Settlements",
      taskType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    },
    {
      name:"Chargebacks",
      taskType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    },
    {
      name:"Refunds",
      taskType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    },
    {
      name:"Reports",
      taskType:"BOTH",
      subModules:[
        {
          name:"PlatformCost",
          taskType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        }, 
         {
          name:"RefundCost",
          taskType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
        {
          name:"ChargeBackCost",
          taskType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
        {
          name:"SuccessFailureRate",
          taskType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
        {
          name:"MerchantsBalance",
          taskType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
  
      ]
    },
    {
      name:"Transaction",
      taskType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    },
    // {
    //   name:"Transaction",
    //   taskType:"BOTH",
    //   actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    // }

  ]