import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

// ===============================Props==============================
interface ReferralCodeSectionProps {
  referralCode: string;
  referralLink: string;
}

// ===============================Component==============================
const ReferralCodeSection = ({
  referralCode,
  referralLink,
}: ReferralCodeSectionProps) => {
  // ===============================Event Handlers==============================
  const handleCopy = (text: string, type: "code" | "link") => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(
        type === "code"
          ? "Referral code copied to clipboard!"
          : "Referral link copied to clipboard!",
        {
          position: "top-center",
          duration: 3000,
          style: {
            background: "#10b981",
            color: "#fff",
            fontWeight: "600",
          },
        }
      );
    });
  };

  return (
    <div className=" rounded-xl space-y-4 bg-linear-to-br from-yellow-300 p-5 to-yellow-500">
      <div>
        <h2 className="text-sm font-semibold  text-gray-900 mb-3">
          Your Referral Code
        </h2>
        <div className=" rounded-xl bg-white p-4 flex items-center justify-between gap-4">
          <span className="text-gray-900 font-bold text-lg break-all">
            {referralCode}
          </span>
          <button
            onClick={() => handleCopy(referralCode, "code")}
            className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Copy referral code"
          >
            <FiCopy className="text-xl text-gray-900" />
          </button>
        </div>
      </div>

      <div>
        <div className=" rounded-xl bg-white p-4 flex items-center justify-between gap-4">
          <span className="text-gray-900 font-medium text-sm break-all">
            {referralLink}
          </span>
          <button
            onClick={() => handleCopy(referralLink, "link")}
            className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Copy referral link"
          >
            <FiCopy className="text-xl text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralCodeSection;
