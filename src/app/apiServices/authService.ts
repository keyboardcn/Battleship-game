import { api, publicApi } from './axiosSetting';
import { tokenStore } from './tokenStore';
type LoginResponseTpye = {
  accessToken: string;
  refreshToken: string;
}
export async function loginUser(email: string, password: string): Promise<{data: LoginResponseTpye}> {
  const { data } = await publicApi.post('/auth/login', { email, password });
  tokenStore.set(data.accessToken);
  return {data: data};
}


export async function logoutUser() {
  const { data } = await api.post('/auth/logout');
  tokenStore.clear();
  return data;
}

export async function getAllBooks() {
  const { data } = await api.get('/books');
  return data;
}
