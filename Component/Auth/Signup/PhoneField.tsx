import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneFieldProps } from "@/Types/Auth/SignUp/Signup";


export const PhoneField = ({ phone, error, onChange }: PhoneFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <div className="relative">
        <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+880"
          className={`pl-9 sm:pl-10 ${error ? "border-red-500" : ""}`}
          value={phone}
          onChange={onChange}
          required
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
