import { getToken } from './auth';

const BASE_URL = 'http://localhost:5000/api/v1';

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = getToken();

  const headers: Record<string, any> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
};