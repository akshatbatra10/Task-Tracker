import api from "./api";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  country: string;
}

export interface SignupResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const signup = async (
  payload: SignupPayload
): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>("/auth/signup", payload);

  return response.data;
};

export const login = async (payload: LoginPayload): Promise<SignupResponse> => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};
