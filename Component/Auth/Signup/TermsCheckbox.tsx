import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TermsCheckboxProps } from "@/Types/Auth/SignUp/Signup";


export const TermsCheckbox = ({
  checked,
  error,
  onCheckedChange,
}: TermsCheckboxProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
          className="mt-0.5"
        />
        <Label
          htmlFor="terms"
          className="cursor-pointer font-normal text-xs leading-relaxed sm:text-sm"
        >
          I agree to the{" "}
          <span className="text-yellow-600 hover:underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-yellow-600 hover:underline">
            Privacy Policy
          </span>
        </Label>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
