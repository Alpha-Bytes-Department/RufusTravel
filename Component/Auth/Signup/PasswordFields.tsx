import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordFieldsProps } from "@/Types/Auth/SignUp/Signup";

export const PasswordFields = ({
  password,
  confirmPassword,
  errors,
  onChange,
}: PasswordFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      {/* ===============================Create Password Field============================== */}
      <div className="space-y-2">
        <Label htmlFor="password">Create Password</Label>
        <div className="relative">
          <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Min 8 chars, uppercase, lowercase, number"
            className={`pl-9 pr-10 sm:pl-10 ${
              errors.password ? "border-red-500" : ""
            }`}
            value={password}
            onChange={onChange}
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="size-4 sm:size-5" />
            ) : (
              <Eye className="size-4 sm:size-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>

      {/* ===============================Confirm Password Field============================== */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            className={`pl-9 pr-10 sm:pl-10 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            value={confirmPassword}
            onChange={onChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4 sm:size-5" />
            ) : (
              <Eye className="size-4 sm:size-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        )}
      </div>
    </>
  );
};
