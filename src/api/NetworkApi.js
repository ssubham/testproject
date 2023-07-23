import axios from 'axios';

const NetworkApi = {
  requestTimeout: 30000,
  getDefaultHeaders: () => ({
    Accept: 'application/json',
    'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
    'Content-Type': 'application/json',
  }),

  getHeaders: () => {
    const headers = {
      ...NetworkApi.getDefaultHeaders()
    };
    return headers;
  },

  get: (route, params, headers) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route, params, 'get', headers, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }),
  post: (route, params, headers, hidePopError) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route, params, 'post', headers, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      }, hidePopError);
    }),
  patch: (route, params, headers) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route, params, 'patch', headers, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }),
    put: (route, params, headers) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route, params, 'put', headers, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }),
  delete: (route, params, headers) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route, params, 'delete', headers, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }),
  prepareConfig: async (url, data, methodType, headers, callback, hidePopError) => {
    const config = {
      method: methodType,
      url,
      data,
      headers: headers || NetworkApi.getDefaultHeaders()
      // timeout: NetworkApi.requestTimeout
    };
    NetworkApi.call(config, callback, hidePopError);
  },
  call: (config, callback, hidePopError) => {
    // console.log('api ', config)
    axios(config)
      .then((response) => {
        callback(null, response.data);
      })
      .catch((error) => {
        callback(error, null);
        if(error?.response) {
          
        }
         else if(error?.message){
          
        }
      });
  }
};

export default NetworkApi;
