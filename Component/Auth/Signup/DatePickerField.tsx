import { useState } from "react";
import type { DropdownNavProps, DropdownProps } from "react-day-picker";
import { Calendar as CalendarIcon, IdCard } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DatePickerFieldProps } from "@/Types/Auth/SignUp/Signup";


export const DatePickerField = ({
  date,
  error,
  onDateChange,
  onErrorClear,
}: DatePickerFieldProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "_ _ _ - _ _ - _ _ _ _";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date Of Birth</Label>
        <div className="relative">
          <IdCard className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
          <Input
            id="dateOfBirth"
            placeholder={formatDate(date)}
            className={`cursor-pointer pl-9 pr-10 sm:pl-10 ${
              error ? "border-red-500" : ""
            }`}
            onClick={() => setShowCalendar(true)}
            readOnly
            required
          />
          <CalendarIcon
            className="absolute top-1/2 right-3 size-4 -translate-y-1/2 cursor-pointer text-gray-400 sm:size-5"
            onClick={() => setShowCalendar(true)}
          />
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>

      {/* ===============================Calendar Modal============================== */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="max-w-[80vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Your Date of Birth</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Calendar
              captionLayout="dropdown-years"
              className="rounded-xl"
              components={{
                DropdownNav: (props: DropdownNavProps) => {
                  return (
                    <div className="flex w-full items-center justify-center gap-3 [&>span]:font-medium [&>span]:text-sm">
                      {props.children}
                    </div>
                  );
                },
                YearsDropdown: (props: DropdownProps) => {
                  return (
                    <Select
                      onValueChange={(value) => {
                        if (props.onChange) {
                          handleCalendarChange(value, props.onChange);
                        }
                      }}
                      value={String(props.value)}
                    >
                      <SelectTrigger className="h-8 w-fit font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                        {props.options?.map((option) => (
                          <SelectItem
                            disabled={option.disabled}
                            key={option.value}
                            value={String(option.value)}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                },
              }}
              defaultMonth={date || new Date(2003, 8)}
              mode="single"
              onSelect={(selectedDate) => {
                onDateChange(selectedDate);
                onErrorClear();
                setShowCalendar(false);
              }}
              selected={date}
              startMonth={new Date(1900, 0)}
              endMonth={new Date()}
              disabled={(date) =>
                date > new Date() || date < new Date(1900, 0, 1)
              }
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
