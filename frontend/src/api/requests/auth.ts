import type { AxiosResponse } from 'axios';
import { api } from '../instance';
import type { LoginPayload, SignUpPayload } from '../types/auth';

export async function login(payload: LoginPayload): Promise<
  AxiosResponse<{
    access_token: string;
  }>
> {
  return api.post('/login', payload);
}

export async function signUp(payload: SignUpPayload): Promise<
  AxiosResponse<{
    access_token: string;
  }>
> {
  return api.post('/sign-up', payload);
}
