import {get,post} from './request';

export const login = (email,password) => get( `Auth/Login?email=${email}&password=${password}`)
export const register = (data) => post( `Auth/Register`,data)



export const getAllProducts=()=> get(`Product/GetAll`);

export const productCreate =((data,token) => post(`Product/Create`,data,token))

export const productUpdate =((data,token) =>  post(`Product/Update`,data,token))

export const getProductById = (id) => get(`Product/GetById?id=${id}`);

export const productDelete = (id) => get(`Product/Delete?id=${id}`);

export const filterProducts = (sortOrder = 'default',category = 'all') => get(`Product/Filter?sortOrder=${sortOrder}&category=${category}`);


export const getAllCategories=()=> get(`Category/GetAll`);

export const categoryCreate =((data,token) =>  post(`Category/Create`,data,token))

export const categoryUpdate =((data,token) => post(`Category/Update`,data,token))

export const getCategoryById = (id) => get(`Category/GetById?id=${id}`);

export const categoryDelete = (id) => get(`Category/Delete?id=${id}`);