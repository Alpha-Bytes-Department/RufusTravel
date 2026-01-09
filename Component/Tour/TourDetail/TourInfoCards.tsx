"use client";

import {
  IoTimeOutline,
  IoPeopleOutline,
  IoLanguageOutline,
  IoCalendarOutline,
} from "react-icons/io5";

// ===============================Props Interface==============================
interface TourInfoCardsProps {
  duration: string;
  maxGroup: string;
  languages: string;
  nextDate: string;
}

// ===============================Component==============================
const TourInfoCards = ({
  duration,
  maxGroup,
  languages,
  nextDate,
}: TourInfoCardsProps) => {
  // ===============================Info Cards Data==============================
  const infoCards = [
    {
      icon: <IoTimeOutline className="text-2xl text-yellow-500" />,
      label: "Duration",
      value: duration,
    },
    {
      icon: <IoPeopleOutline className="text-2xl text-yellow-500" />,
      label: "Max Group",
      value: maxGroup,
    },
    {
      icon: <IoLanguageOutline className="text-2xl text-yellow-500" />,
      label: "Language",
      value: languages,
    },
    {
      icon: <IoCalendarOutline className="text-2xl text-yellow-500" />,
      label: "Next Date",
      value: nextDate,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {infoCards.map((card, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-yellow-400 transition-colors"
        >
          <div className="mb-2">{card.icon}</div>
          <p className="text-sm text-gray-600 mb-1">{card.label}</p>
          <p className="text-sm font-semibold text-gray-900 text-center">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TourInfoCards;
