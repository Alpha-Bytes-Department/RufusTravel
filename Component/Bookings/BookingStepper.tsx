"use client";

// ===============================Props Interface==============================
interface BookingStepperProps {
  currentStep: number;
  totalSteps: number;
}

// ===============================Component==============================
const BookingStepper = ({ currentStep, totalSteps }: BookingStepperProps) => {
  // ===============================Step Labels==============================
  const steps = [
    { number: 1, label: "Add-ons" },
    { number: 2, label: "Payment" },
    { number: 3, label: "Confirmation" },
  ];

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  step.number < currentStep
                    ? "bg-green-500 text-white"
                    : step.number === currentStep
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.number < currentStep ? "✓" : step.number}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  step.number <= currentStep ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-1 mx-4 transition-all ${
                  step.number < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStepper;
