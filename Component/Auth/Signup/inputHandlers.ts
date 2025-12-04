// ===============================Input Handling Utilities==============================

export const handlePhoneInput = (value: string): string => {
  const phonePrefix = "";

  //---------------------- Ensure prefix is always present ----------------
  if (!value.startsWith(phonePrefix)) {
    return phonePrefix;
  }

  //---------------------- Extract and format digits ----------------
  const digits = value.slice(phonePrefix.length).replace(/\D/g, "");

  //---------------------- Limit to 10 digits ----------------
  if (digits.length <= 10) {
    return phonePrefix + digits;
  }

  return value;
};

export const handleNINInput = (value: string): string => {
  //---------------------- Only allow digits, max 11 ----------------
  const digits = value.replace(/\D/g, "");
  return digits.length <= 11 ? digits : value;
};

export const handlePassportInput = (value: string): string => {
  //---------------------- Alphanumeric only, max 15, uppercase ----------------
  const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return alphanumeric.length <= 15 ? alphanumeric : value;
};
