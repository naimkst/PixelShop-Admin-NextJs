import request from "../../lib/request";

//Create Product
export const createProduct = async (payload: any) => {
  const { data } = await request.post("product", payload);
  return data;
};

//Register User
export const createUser = async (payload: any) => {
  console.log(payload)
  const { data } = await request.post("user/register", payload);
  return data;
};

