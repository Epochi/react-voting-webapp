//create axios instance for client side usage only
import axios from 'axios';


export default function ApiClient(){
  const client = axios.create({
    //Set baseURL to what the user will be accessing
    baseURL: `https://yp-dev-postgres-miauwi.c9users.io/`
  });
  
  
  return client;
}
