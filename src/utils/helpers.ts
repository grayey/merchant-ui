import { AbstractControl } from '@angular/forms';
declare const $: any;


/**
 *
 * @param abstractControl
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


export const buildUrlParams = (paramData):string | void => {
    if(!paramData) return;
    let urlParams = "?";
    for(const param in paramData){
      urlParams +=`${param}=${paramData[param]}&`;
    }
    return urlParams;
}

export const refineData = (data:any[], processDatum:any):any[] => {
  return data.map((datum) =>  processDatum(datum));
}


/**
 *
 * @param formIsValid
 * This method sets the class on a submit button based on form validation
 */
export const  setValidationClass = (formIsValid): string => {
  return formIsValid ? 'btn btn-success' : 'btn btn-primary';
}




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

export const tableRerender =  (data, tableId = '', tableTitle = '') => {
  $(document).ready(() => {
    if ($.fn.DataTable.isDataTable(`#${tableId}`)) {
     $(`#${tableId}`).DataTable().clear().destroy(); // remember .clear()!!
    }
    tableRun(data, tableId, tableTitle);

  });
};
