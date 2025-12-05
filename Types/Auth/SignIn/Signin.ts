// ===============================Sign In Types==============================

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignInProps {
  onSubmit?: (data: SignInFormData) => void | Promise<void>;
  onGoogleSignIn?: () => void | Promise<void>;
  onFacebookSignIn?: () => void | Promise<void>;
  onForgotPassword?: () => void;
  isLoading?: boolean;
}

export interface SignInErrors {
  email?: string;
  password?: string;
  general?: string;
}
