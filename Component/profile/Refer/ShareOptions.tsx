import { FiMail, FiLink, FiShare2 } from "react-icons/fi";
import toast from "react-hot-toast";

// ===============================Props==============================
interface ShareOptionsProps {
  referralCode: string;
  referralLink: string;
  pointsPerReferral: number;
}

// ===============================Component==============================
const ShareOptions = ({
  referralCode,
  referralLink,
  pointsPerReferral,
}: ShareOptionsProps) => {
  // ===============================Event Handlers==============================
  const handleEmailShare = () => {
    const subject = encodeURIComponent("Join Tripbank and Get Travel Rewards!");
    const body = encodeURIComponent(
      `Hi there!\n\nI'm inviting you to join Tripbank, the best platform for booking your travel adventures!\n\nUse my referral code: ${referralCode}\n\nOr click this link: ${referralLink}\n\nYou'll get exclusive benefits when you sign up, and we'll both earn ${pointsPerReferral} points when you make your first booking!\n\nHappy travels!\n`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
      "_blank"
    );
    toast.success("Opening Gmail...", {
      position: "top-center",
      duration: 2000,
    });
  };

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      toast.success("Referral link copied to clipboard!", {
        position: "top-center",
        duration: 3000,
        style: {
          background: "#10b981",
          color: "#fff",
          fontWeight: "600",
        },
      });
    });
  };

  const handleSocialShare = () => {
    const shareData = {
      title: "Join Tripbank",
      text: `Use my referral code ${referralCode} to get rewards!`,
      url: referralLink,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          toast.success("Shared successfully!", {
            position: "top-center",
            duration: 2000,
          });
        })
        .catch((err) => {
          console.log("Share cancelled or failed:", err);
        });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(referralLink).then(() => {
        toast.success("Link copied! Share it on your favorite social media.", {
          position: "top-center",
          duration: 3000,
        });
      });
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        onClick={handleEmailShare}
        className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:from-amber-100 hover:to-yellow-100 transition-all border border-yellow-100"
      >
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <FiMail className="text-2xl text-gray-700" />
        </div>
        <span className="text-sm font-semibold text-gray-900">Email</span>
      </button>

      <button
        onClick={handleLinkCopy}
        className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:from-amber-100 hover:to-yellow-100 transition-all border border-yellow-100"
      >
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <FiLink className="text-2xl text-gray-700" />
        </div>
        <span className="text-sm font-semibold text-gray-900">Link</span>
      </button>

      <button
        onClick={handleSocialShare}
        className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:from-amber-100 hover:to-yellow-100 transition-all border border-yellow-100"
      >
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <FiShare2 className="text-2xl text-gray-700" />
        </div>
        <span className="text-sm font-semibold text-gray-900">Social</span>
      </button>
    </div>
  );
};

export default ShareOptions;
