export type Deal = {
  id: number
  title: string
  created_at: string
  firm: string
  asset_class: string
  deal_status: string
  currency: string
  deal_capital_seeker_email: string
  files_available: boolean
}

export type LoginRequest = {
  website: string;
  email: string;
  password: string;
}

export type LoginResponse = {
  success: boolean;
  website: string;
  message?: string;
}

export type ErrorResponse = {
  error: string;
  detail?: string;
  status_code: number;
}

export type ApiError = {
  message: string;
  status: number;
  code?: string;
}