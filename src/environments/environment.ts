// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  googleMapsApiKey: '',
  backend: 'http://34.240.160.43:8085',// Put your backend here
  // API_BASE_URL:"http://52.208.91.202:8085",
  API_BASE_URL:"http://34.240.160.43:8085/api/v1/",
  API_KEY:""
};
