import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';
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
    paramData['transactionStartDate'] = paramData['startDate'];
    paramData['transactionEndDate'] = paramData['endDate'];
    let urlParams = "?";
    for(const param in paramData){
      let paramValue = paramData[param];
      if(param=='merchantId'){
        paramValue = isAdmin ? paramValue : authUser.merchantId;
      }
      if(param.toLowerCase().includes('startdate')){
        paramValue = encodeURI(paramValue);
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
  return data.length ? data.map((datum) =>  processDatum(datum)) : [];
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

export const getToday = (dateType?:string) =>{
  const typeSuffix = {
    start:' 00:00:00',
    end:' 23:59:59'
  }
  const date = new Date().toISOString().split('T')[0];
  return dateType ? `${date}${typeSuffix[dateType] || ""}` : date;
}

export const formatDateHelper = (date) => moment(date).format('yyyy-MM-DD hh:mm:ss');

export const processErrors = (error): string => {
  let errorBody = '';
  let errorError = error['error'] || {msg: error['message'] };
  const errors = errorError['error_description'] || errorError['error'] || errorError['message'] || errorError['msg'] || {};
  if(typeof errors =='string'){
    errorBody = errors;
  }else{
    if (Object.keys(errors).length) {
      for (const key in errors) {
        errorBody += errors[key].toString();
      }
    }else if (errorError?.message) {
      errorBody = error?.error_description|| error?.message;
    }
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
