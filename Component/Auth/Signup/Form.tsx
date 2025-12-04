"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NameFields } from "./NameFields";
import { EmailField } from "./EmailField";
import { PhoneField } from "./PhoneField";
import { DocumentFields } from "./DocumentFields";
import { DatePickerField } from "./DatePickerField";
import { GenderSelector } from "./GenderSelector";
import { PasswordFields } from "./PasswordFields";
import { TermsCheckbox } from "./TermsCheckbox";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { validateForm } from "./formValidation";
import {
  handlePhoneInput,
  handleNINInput,
  handlePassportInput,
} from "./inputHandlers";

const Form = () => {
  // ===============================Form State==============================
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+880 ",
    ninNumber: "",
    passportNumber: "",
    gender: "male",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ===============================Event Handlers==============================
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //---------------------- Clear error on input change ----------------
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    //---------------------- Handle special field formatting ----------------
    let formattedValue = value;

    if (name === "phone") {
      formattedValue = handlePhoneInput(value);
    } else if (name === "ninNumber") {
      formattedValue = handleNINInput(value);
    } else if (name === "passportNumber") {
      formattedValue = handlePassportInput(value);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //---------------------- Validate form before submission ----------------
    const validationErrors = validateForm(formData, date);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", {
        ...formData,
        dateOfBirth: date,
      });
      alert("Form submitted successfully! Check console for data.");
    } else {
      console.log("Form has errors:", validationErrors);
    }
  };

  // ===============================Render Component==============================
  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
      <h1 className="mb-6 font-bold text-2xl sm:text-3xl md:mb-8">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* ===============================Name Fields============================== */}
        <NameFields
          firstName={formData.firstName}
          lastName={formData.lastName}
          errors={errors}
          onChange={handleInputChange}
        />

        {/* ===============================Email Field============================== */}
        <EmailField
          email={formData.email}
          error={errors.email}
          onChange={handleInputChange}
        />

        {/* ===============================Phone Field============================== */}
        <PhoneField
          phone={formData.phone}
          error={errors.phone}
          onChange={handleInputChange}
        />

        {/* ===============================Document Fields============================== */}
        <DocumentFields
          ninNumber={formData.ninNumber}
          passportNumber={formData.passportNumber}
          errors={errors}
          onChange={handleInputChange}
        />

        {/* ===============================Date of Birth Field============================== */}
        <DatePickerField
          date={date}
          error={errors.dateOfBirth}
          onDateChange={setDate}
          onErrorClear={() =>
            setErrors((prev) => ({ ...prev, dateOfBirth: "" }))
          }
        />

        {/* ===============================Gender Selector============================== */}
        <GenderSelector
          gender={formData.gender}
          onGenderChange={(value) =>
            setFormData((prev) => ({ ...prev, gender: value }))
          }
        />

        {/* ===============================Password Fields============================== */}
        <PasswordFields
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          errors={errors}
          onChange={handleInputChange}
        />

        {/* ===============================Terms Checkbox============================== */}
        <TermsCheckbox
          checked={formData.agreeToTerms}
          error={errors.agreeToTerms}
          onCheckedChange={(checked) => {
            setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
            if (errors.agreeToTerms) {
              setErrors((prev) => ({ ...prev, agreeToTerms: "" }));
            }
          }}
        />

        {/* ===============================Submit Button============================== */}
        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-gray-300 text-gray-500 hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12"
          disabled={!formData.agreeToTerms}
        >
          Sign Up
        </Button>
          {/* ### TODO : Create Social Log in function  */}
        {/* ===============================Social Login Section============================== */}
        <SocialLoginButtons
          onGoogleClick={() => console.log("Google sign up clicked")}
          onFacebookClick={() => console.log("Facebook sign up clicked")}
        />
      </form>
    </div>
  );
};

export default Form;
