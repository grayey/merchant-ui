export interface IBaseReport{
    merchantId: number;
    merchantName: string;
    merchantAccountNumber: string;
}

export interface IPlatformCostReport extends IBaseReport{
    amountDueToBank: number;
    amountDueToMerchant: number;
    amountDueToPlatform: number;
}

export interface IRefundCostReport extends IBaseReport{
    totalRefundCount: number;
    totalRefundCost: number;
}

export interface IChargebackCostReport extends IBaseReport{
    totalChargeBackCount: number;
    totalChargeBackCost: number;
}