import { IdCard, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentFieldsProps } from "@/Types/Auth/SignUp/Signup";


export const DocumentFields = ({
  ninNumber,
  passportNumber,
  errors,
  onChange,
}: DocumentFieldsProps) => {
  return (
    <>
      {/* ===============================NIN Number Field============================== */}
      <div className="space-y-2">
        <Label htmlFor="ninNumber">NIN Number (Optional)</Label>
        <div className="relative">
          <IdCard className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
          <Input
            id="ninNumber"
            name="ninNumber"
            placeholder="11 digits"
            className={`pl-9 sm:pl-10 ${
              errors.ninNumber ? "border-red-500" : ""
            }`}
            value={ninNumber}
            onChange={onChange}
            maxLength={11}
          />
        </div>
        {errors.ninNumber && (
          <p className="text-red-500 text-xs">{errors.ninNumber}</p>
        )}
      </div>

      {/* ===============================Passport Number Field============================== */}
      <div className="space-y-2">
        <Label htmlFor="passportNumber">Passport Number (Optional)</Label>
        <div className="relative">
          <CreditCard className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
          <Input
            id="passportNumber"
            name="passportNumber"
            placeholder="Passport Number"
            className={`pl-9 sm:pl-10 ${
              errors.passportNumber ? "border-red-500" : ""
            }`}
            value={passportNumber}
            onChange={onChange}
            maxLength={15}
          />
        </div>
        {errors.passportNumber && (
          <p className="text-red-500 text-xs">{errors.passportNumber}</p>
        )}
      </div>
    </>
  );
};
