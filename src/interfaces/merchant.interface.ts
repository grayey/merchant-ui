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

  export interface IMerchantFeeInfo{
    bank_mdr_commission: number;
    mdrFee: number;
    mdrFeeValueType: string;
    platform_mdr_commission: number;
    transactionFee: number;
    transactionFeeValueType: string;
}

export interface IMerchantProcessingGatewayAppInfo {
  aesKey: string;
  applicationId: string;
  expiryDate: string;
  ivKey: string;
}

export interface IMerchantUser{
    fullName: string;
    merchantId: number;
    password: string;
    processingGatewayId: number;
    userRoleId: number;
    userTypeId: number;
    username: string;
  
}