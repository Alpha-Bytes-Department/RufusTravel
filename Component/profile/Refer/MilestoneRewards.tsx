import toast from "react-hot-toast";
import { MilestoneReward } from "@/Types/Profile/Refer.types";

// ===============================Props==============================
interface MilestoneRewardsProps {
  milestones: MilestoneReward[];
}

// ===============================Component==============================
const MilestoneRewards = ({ milestones }: MilestoneRewardsProps) => {
  // ===============================Event Handlers==============================
  const handleClaimReward = (milestoneId: string, points: number) => {
    toast.success(`Claimed ${points} bonus points!`, {
      position: "top-center",
      duration: 3000,
      icon: "🎉",
      style: {
        background: "#fbbf24",
        color: "#000",
        fontWeight: "600",
      },
    });
  };

  return (
    <div className=" rounded-2xl  p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Milestone Rewards
      </h2>
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold">
                {milestone.referralsRequired}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {milestone.referralsRequired} Referrals
                </h3>
                <p className="text-sm text-gray-600">
                  {milestone.bonusPoints.toLocaleString()} Bonus Points
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                handleClaimReward(milestone.id, milestone.bonusPoints)
              }
              disabled={milestone.isClaimed}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                milestone.isClaimed
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              }`}
            >
              {milestone.isClaimed ? "Claimed" : "Claim"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneRewards;
