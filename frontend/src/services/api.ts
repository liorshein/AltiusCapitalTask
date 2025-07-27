import type { LoginRequest, LoginResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const loginApi = async (loginData: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.detail, response.status);
  }

  return data;
};

export const validateSessionApi = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.detail, response.status);
  }

  return data;
};

export const getDealsApi = async () => {
  const response = await fetch(`${API_BASE_URL}/deals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.detail, response.status);
  }

  return data;
};

export const logoutApi = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.detail, response.status);
  }

  return data;
};

export const downloadDealApi = async (dealId: number) => {
  const response = await fetch(`${API_BASE_URL}/deals/${dealId}/file`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.detail, response.status);
  }

  return data;
};