export interface IMerchant{
    merchantName?:string;
    code?:string;
}

export interface ICreateMerchant{
    accountNumber: string;
    address: string;
    agid: string;
    api_AUTH_DATA_JSON: string;
    // bankType: string;
    // businessType: string;
    bankId:string;
    businessCategoryId:string;
    businessYears: string;
    callbackUrl: string;
    companyName: string;
    currency: string;
    email: string;
    merchantCode: string;
    phoneNumber: string;
    primaryContactEmail: string;
    primaryContactName: string;
    primaryContactPhoneNumber: string;
    primaryContactTelephone: string;
    region: string;
    secondaryContactEmail: string;
    secondaryContactName: string;
    secondaryContactTelephone: string;
    transactionDescription: string;
    transactionRef: string;
    websiteLink: string
  }

export interface IVerifyOTP{
    agid: string;
    api_AUTH_DATA_JSON: string;
    email: string;
    otp: string;
    password: string;
    transactionDescription: string;
  }