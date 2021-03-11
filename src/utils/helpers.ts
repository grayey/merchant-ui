import { AbstractControl } from '@angular/forms';
declare const $: any;


/**
 *
 * @param abstractControl
 * @returns boolean
 * This method returns checks if a field is required
 */
export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({}as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
  if (abstractControl['controls']) {
    for (const controlName in abstractControl['controls']) {
      if (abstractControl['controls'][controlName]) {
        if (hasRequiredField(abstractControl['controls'][controlName])) {
          return true;
        }
      }
    }
  }
  return false;
}


/**
 * 
 * @param paramData 
 * @returns string
 * This method builds the params for a url
 */
export const buildUrlParams = (paramData):string | void => {
    if(!paramData) return;
    const authUser = JSON.parse(localStorage.getItem('userData'));
    const isAdmin = !authUser?.merchantId;
    let urlParams = "?";
    for(const param in paramData){
      let paramValue = paramData[param];
      if(param=='merchantId'){
        paramValue = isAdmin ? paramValue : authUser.merchantId;
      }
      urlParams +=`${param}=${paramValue}&`;
    }
    return urlParams;
}

/**
 * 
 * @param data : Array
 * @param processDatum : fn
 * @returns Array
 * This method takes an array and callback that modifies each item
 */
export const refineData = (data:any[], processDatum:any):any[] => {
  return data.map((datum) =>  processDatum(datum));
}



/**
 *
 * @param formIsValid
 * @returns string
 * This method sets the class on a submit button based on form validation
 */
export const  setValidationClass = (formIsValid): string => {
  return formIsValid ? 'btn btn-success' : 'btn btn-primary';
}

export const getToday = () =>{
  return new Date().toISOString().split('T')[0]

}

export const processErrors = (error): string => {
  let errorBody = '';
  const errors = error['error']['error_description'] || error['error']['error'];
  if (errors) {
    for (const key in errors) {
      errorBody += errors[key].toString();
    }
  } else if (error['error']['message']) {
    errorBody = error['error']['error_description'] || error['error']['message'];
  } else if (error['message']) {
    errorBody = error['error_description'] || error['message'];
  }
  return errorBody;
}



/**
 * 
 * @param data 
 * @param tableId 
 * @param tableTitle 
 * @returns void
 * This method renders a datatable
 */
export const tableRun = (data, tableId = '', tableTitle = '') => {
  $(document).ready(() => {
    const tId = (tableId) ? tableId : 'data_table';

    setTimeout(() => {
      const table = $(`#${tId}`).DataTable({
        lengthChange: false,
        order: [],

        buttons: [

          {
            extend: 'csv',
            title: () => {
              return `PORTAL ${tableTitle}`;
            }
          },

          {
            extend: 'excel',
            title: () => {
              return `PORTAL_${tableTitle.toLowerCase()}`;
            }
          },

          {
            extend: 'pdf',
            title: () => {
              return `PORTAL ${tableTitle}`;
            }
          },

          {
            extend: 'print',
            title: () => {
              return `PORTAL ${tableTitle}`;
            }
          }

        ],
      });

      table.buttons().container()
        .appendTo(`#${tId}_wrapper .col-md-6:eq(0)`);

    }, 10);
  });
};

/**
 * 
 * @param data 
 * @param tableId 
 * @param tableTitle 
 * This method destroys and re-renders a data table
 */
export const tableRerender =  (data, tableId = '', tableTitle = '') => {
  $(document).ready(() => {
    if ($.fn.DataTable.isDataTable(`#${tableId}`)) {
     $(`#${tableId}`).DataTable().clear().destroy(); // remember .clear()!!
    }
    tableRun(data, tableId, tableTitle);

  });
};
