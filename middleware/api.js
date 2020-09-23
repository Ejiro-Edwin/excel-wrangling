// const endPoint = "https://ami-admin-module.herokuapp.com/api/v1";
const endPoint = process.env.endPoint;
// const endpointUser = "https://staff-service.herokuapp.com/api/v1";

import axios from "axios";

export const getCompanies = () => {
  return axios.get(`${endPoint}/variable/getAllCompanies`);
};
export const signIn = data => {
  return axios.post(`${endPoint}/users/signIn`, data);
};

export const createUser = data => {
  return axios.post(`${endPoint}/users/addUser`, data);
};

