export interface FormData {
  email: string;
}

export interface Errors {
  general?: string;
}
export type ResetFormData = {
  password: string;
  confirmPassword: string;
};