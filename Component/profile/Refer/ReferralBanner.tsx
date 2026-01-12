import { FiGift } from "react-icons/fi";

// ===============================Props==============================
interface ReferralBannerProps {
  pointsPerReferral: number;
}

// ===============================Component==============================
const ReferralBanner = ({ pointsPerReferral }: ReferralBannerProps) => {
  return (
    <div
      className="relative w-full h-48 bg-linear-to-br from-teal-500 via-cyan-500 to-blue-500 overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=400&fit=crop)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(6, 182, 212, 0.7)",
      }}
    >
      

      {/* ===============================Banner Content============================== */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
        <FiGift className="text-5xl mb-3" />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Refer & Earn</h1>
        <p className="text-sm md:text-base font-semibold">
          {pointsPerReferral} points per friend
        </p>
      </div>
    </div>
  );
};

export default ReferralBanner;
