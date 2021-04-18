
export const APP_TASKS = [
    {
      functionName:"Users",
      functionType:"ADMIN",
      actions:["CAN_VIEW_ALL", "CAN_CREATE", "CAN_EDIT","CAN_FILTER"]
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
          functionName:"PlatformCost",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        }, 
         {
          functionName:"RefundCost",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
        {
          functionName:"ChargeBackCost",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
        {
          functionName:"SuccessFailureRate",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
        {
          functionName:"MerchantsBalance",
          functionType:"BOTH",
          actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
        },
  
      ]
    },
    {
      functionName:"Transaction",
      functionType:"BOTH",
      actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    },
    // {
    //   functionName:"Transaction",
    //   functionType:"BOTH",
    //   actions:["CAN_VIEW_ALL", "CAN_DOWNLOAD","CAN_FILTER"]
    // }

  ]