// ===============================Form Validation Utilities==============================

export const validateForm = (
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    ninNumber: string;
    passportNumber: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  },
  date: Date | undefined
): Record<string, string> => {
  const newErrors: Record<string, string> = {};

  //---------------------- First Name Validation ----------------
  if (!formData.firstName.trim()) {
    newErrors.firstName = "First name is required";
  } else if (formData.firstName.trim().length < 2) {
    newErrors.firstName = "First name must be at least 2 characters";
  }

  //---------------------- Last Name Validation ----------------
  if (!formData.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  } else if (formData.lastName.trim().length < 2) {
    newErrors.lastName = "Last name must be at least 2 characters";
  }

  //---------------------- Email Validation ----------------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Please enter a valid email address";
  }

  //---------------------- Phone Validation ----------------
  const phoneDigits = formData.phone.replace(/\D/g, "");
  if (phoneDigits.length !== 13) {
    newErrors.phone = "Phone number must be 10 digits after +880";
  }

  //---------------------- NIN Number Validation (Optional) ----------------
  if (formData.ninNumber && formData.ninNumber.length !== 11) {
    newErrors.ninNumber = "NIN must be 11 digits";
  }

  //---------------------- Passport Number Validation (Optional) ----------------
  if (formData.passportNumber && formData.passportNumber.length < 6) {
    newErrors.passportNumber = "Passport number must be at least 6 characters";
  }

  //---------------------- Date of Birth Validation ----------------
  if (!date) {
    newErrors.dateOfBirth = "Date of birth is required";
  } else {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();

    const actualAge =
      monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (actualAge < 18) {
      newErrors.dateOfBirth = "You must be at least 18 years old";
    } else if (actualAge > 120) {
      newErrors.dateOfBirth = "Please enter a valid date of birth";
    }
  }

  //---------------------- Password Validation ----------------
  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    newErrors.password =
      "Password must contain uppercase, lowercase, and number";
  }

  //---------------------- Confirm Password Validation ----------------
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  //---------------------- Terms Validation ----------------
  if (!formData.agreeToTerms) {
    newErrors.agreeToTerms = "You must agree to the terms and conditions";
  }

  return newErrors;
};
