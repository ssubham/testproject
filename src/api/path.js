let WORKFLOW_URL = `http://localhost:5000`;
let API_URL = '/api/v1';
let paths = {};

paths = {
  validateLoginURL: `${WORKFLOW_URL}${API_URL}/loginuser`,
  validateRegisterURL:`${WORKFLOW_URL}${API_URL}/createuser/`,
  dashBoardURL: 'https://api.publicapis.org/entries' 
};


export default paths;
