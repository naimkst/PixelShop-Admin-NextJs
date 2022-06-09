import request from "../../lib/request";

//Create Product
export const createProduct = async (payload: any) => {
  const { data } = await request.post("product", payload);
  return data;
};

//getProduct 
export const getAlltData = async (skip: any, take: any, search: any) => {
  const { data } = await request.get(`/product/paginate?skip=${skip}&take=${take}&search=${search}`);
  return data;
};


//Delete Data
export const deleteById = async (id: number) => {
  const { data } = await request.delete(`/product/delete/${id}`);
  return data;
};

//Find By ID
export const getById = async (id: any) => {
  const { data } = await request.get(`/product/find/${id}`);
  return data;
};

//Product Update
export const productUpdate = async (id: any, payload: any) => {
  const { data } = await request.post(`/product/update/${id}`, payload);
  return data;
};


