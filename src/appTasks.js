
export const APP_TASKS = [
    {
      functionName:"Users",
      functionType:"ADMIN",
      actions:["CAN_VIEW_ALL", "CAN_CREATE", "CAN_EDIT","CAN_FILTER"]
    },
    {
      functionName:"Roles",
      functionType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_CREATE", "CAN_EDIT","CAN_FILTER", "CAN_VIEW_DETAIL"]
    },
    {
      functionName:"Merchants",
      functionType:"ADMIN",
      actions:["CAN_VIEW_ALL", "CAN_CREATE", "CAN_EDIT","CAN_FILTER"]
    },
    {
      functionName:"Uploads",
      functionType:"ADMIN",
      actions:["CAN_VIEW_ALL", "CAN_CREATE", "CAN_VIEW_DETAIL","CAN_FILTER"]
    },
    {
      functionName:"Settlements",
      functionType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    },
    {
      functionName:"Chargebacks",
      functionType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    },
    {
      functionName:"Refunds",
      functionType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    },
    {
      functionName:"Reports",
      functionType:"BOTH",
      subModules:[
        {
          functionName:"Platform Cost",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        }, 
         {
          functionName:"Refund Cost",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
        {
          functionName:"Charge Back Cost",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
        {
          functionName:"Success & Failure Rate",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
        {
          functionName:"Merchants' Balance",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
  
      ]
    },
    {
      functionName:"Transactions",
      functionType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER", "CAN_REFUND"]
    },
    // {
    //   functionName:"Transaction",
    //   functionType:"BOTH",
    //   actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    // }

  ]