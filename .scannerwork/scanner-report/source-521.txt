export interface IRefundsFilter{
pageNumber:number;
pageSize:number;
startDate:string;
endDate:string;
amount?:number
currency?:string;
processingGatewayId?:number;
merchantId?:number;
bankId?:number;
merchantRequestReference?:string;
merchantTransactionReference?:string;
transactionStartDate?:string;
transactionEndDate?:string;
processingFee?:number;
gatewayResponseCode?:string;
gatewayResponseMessage?:string;
gatewayTransactionReference?:string;
settlementStartDate?:string;
settlementEndDate?:string;
settlementStatus?:string;
transactionReference?:string;
transactionStatus?:string;
reportType?:string;

// msgId
// :string;

// tranId
// :string;

// rrn
// :string;

// maskedPan
// :string;

// bin
// :string;

// issCountry
// :string;

// purchaseDate
// :string;

// authDate
// :string;

// authAmt
// number

// authCurr
// :string;

// ttAuthAmt
// number

// scrAmt
// number

// interchangeFees
// number

// acquirerFees
// number

// merchantNet
// number

// scrCurr
// :string;

// actionCode
// :string;

// authCode
// :string;

// cardAcceptorId
// :string;

// terminalId
// :string;

// pi
// :string;

// cardId
// :string;

// requestId
// :string;

// timeOfPurchase
// :string;

// mchName
// :string;

// mchCountryCode
// :string;

// mchCategoryCode
// :string;

// timeStamp
// :string;

// marketPlaceIdentifierPfId
// :string;

// subMchId
// :string;

// claimId
// :string;

// chargebackReferenceNo
// :string;

// txnDate
// :string;

// orgAmt
// :string;

// arn
// :string;

// reportType
// :string;
// (query)
}