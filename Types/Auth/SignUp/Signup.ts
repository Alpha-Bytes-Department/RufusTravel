export interface DocumentFieldsProps {
  ninNumber: string;
  passportNumber: string;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface DatePickerFieldProps {
    date: Date | undefined;
    error?: string;
    onDateChange: (date: Date | undefined) => void;
    onErrorClear: () => void;
}
export interface PasswordFieldsProps {
    password: string;
    confirmPassword: string;
    errors: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    ninNumber: string;
    passportNumber: string;
    gender: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

export interface NameFieldsProps {
    firstName: string;
    lastName: string;
    errors: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface EmailFieldProps {
    email: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface PasswordFieldProps {
    password: string;
    error?: string;
    confirmPassword: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TermsCheckboxProps {
    checked: boolean;
    error?: string;
    onCheckedChange: (checked: boolean) => void;
}

export interface PhoneFieldProps {
    phone: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface GenderSelectorProps {
    gender: string;
    onGenderChange: (value: string) => void;
}

