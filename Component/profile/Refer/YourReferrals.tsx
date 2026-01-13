import { ReferredUser } from "@/Types/Profile/Refer.types";

// ===============================Props==============================
interface YourReferralsProps {
  referrals: ReferredUser[];
}

// ===============================Component==============================
const YourReferrals = ({ referrals }: YourReferralsProps) => {
  return (
    <div className=" rounded-2xl p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Referrals</h2>
      <div className="space-y-4">
        {referrals.map((referral) => (
          <div
            key={referral.id}
            className="rounded-xl p-6 bg-white shadow-md transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{referral.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      referral.status === "joined"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {referral.status === "joined" ? "Joined" : "Pending"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{referral.email}</p>
                <p className="text-xs text-gray-500">{referral.joinDate}</p>
                <p className="text-sm text-gray-700 mt-2">
                  {referral.bookingsCount} booking
                  {referral.bookingsCount !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-2xl font-bold text-green-600">
                  +{referral.pointsEarned.toFixed(2)}
                </div>
                <p className="text-xs text-gray-500">points earned</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourReferrals;
