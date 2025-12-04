import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GenderSelectorProps } from "@/Types/Auth/SignUp/Signup";
export const GenderSelector = ({
  gender,
  onGenderChange,
}: GenderSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label>Select Gender</Label>
      <RadioGroup
        value={gender}
        onValueChange={onGenderChange}
        className="flex flex-wrap gap-4 sm:gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label
            htmlFor="male"
            className="cursor-pointer font-normal text-sm sm:text-base"
          >
            Male
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label
            htmlFor="female"
            className="cursor-pointer font-normal text-sm sm:text-base"
          >
            Female
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other" />
          <Label
            htmlFor="other"
            className="cursor-pointer font-normal text-sm sm:text-base"
          >
            Other
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
