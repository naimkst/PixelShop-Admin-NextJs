import request from "../../lib/request";

//User Login
export const userLogin = async (payload: any) => {
  const { data } = await request.post("user/login", payload);
  return data;
};

export const getUser = async (skip: number, take: number, search: string) => {
  const { data } = await request.get(`auth/paginate?skip=${skip}&take=${take}&search=${search}`);
  return data;
};

export const createUser = async (payload: any) => {
  console.log(payload)
  const { data } = await request.post("auth/signup", payload);
  return data;
};

export const getUserData = async (id: any) => {
  const { data } = await request.get("auth/user/" + id );
  return data;
};

export const updateData = async (id: any, payload: any) => {
  const { data } = await request.put("auth/update/" + id, payload );
  return data;
};

export const deleteById = async (id: any) => {
  const { data } = await request.delete("auth/delete/" + id );
  return data;
};
