import { HowItWorksStep } from "@/Types/Profile/Refer.types";

// ===============================Props==============================
interface HowItWorksProps {
  steps: HowItWorksStep[];
}

// ===============================Component==============================
const HowItWorks = ({ steps }: HowItWorksProps) => {
  return (
    <div className=" rounded-2xl  p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">How it Works</h2>
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.step} className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold">
              {step.step}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
