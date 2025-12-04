import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameFieldsProps {
  firstName: string;
  lastName: string;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameFields = ({
  firstName,
  lastName,
  errors,
  onChange,
}: NameFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <div className="relative">
          <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className={`pl-9 sm:pl-10 ${
              errors.firstName ? "border-red-500" : ""
            }`}
            value={firstName}
            onChange={onChange}
            required
          />
        </div>
        {errors.firstName && (
          <p className="text-red-500 text-xs">{errors.firstName}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <div className="relative">
          <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            className={`pl-9 sm:pl-10 ${
              errors.lastName ? "border-red-500" : ""
            }`}
            value={lastName}
            onChange={onChange}
            required
          />
        </div>
        {errors.lastName && (
          <p className="text-red-500 text-xs">{errors.lastName}</p>
        )}
      </div>
    </div>
  );
};
