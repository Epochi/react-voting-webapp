//create axios instance for client side usage only
import axios from 'axios';


function api(){
  const client = axios.create({
    //Set baseURL to what the user will be accessing
    baseURL: `https://react-webpack-node.c9users.io`
  });
  
  
  return client;
}

const ApiClient = api;

export default ApiClient;