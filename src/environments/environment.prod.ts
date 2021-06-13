export const environment = {
  production: true,
  googleMapsApiKey: '',
  backend: 'https://api-portal.cqpaymentgateway.arca-payments.com', // Put your backend here
  API_BASE_URL:"https://api-portal.cqpaymentgateway.arca-payments.com/api/v1/",
  // API_BASE_URL:"http://34.240.160.43:8085/api/v1/",
  // backend: 'http://34.240.160.43:8085',
  API_KEY:"",
  BASIC_TOKEN:"Basic Y29kZWlxLXBheW1lbnQtZ2F0ZXdheTpzZWNyZXQ=",
  MAX_INACTIVE_TIME:5*60*1000, // 5 minutes
  NOTIFY_INACTIVITY:30*1000, //30 seconds
  IPIFY_URL:"https://ipgeolocation.abstractapi.com/v1/?api_key=6f73766c9d8a467092b3d00a2d310e37",
  MAX_LOGIN_ATTEMPTS:5,
  LOCKOOUT_MINUTES:5,
  FRONT_END_URL:"https://portal.cqpaymentgateway.arca-payments.com",

};
