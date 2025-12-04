import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailFieldProps {
  email: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailField = ({ email, error, onChange }: EmailFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <div className="relative">
        <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Provide Your Email"
          className={`pl-9 sm:pl-10 ${error ? "border-red-500" : ""}`}
          value={email}
          onChange={onChange}
          required
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
