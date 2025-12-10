import Image from "next/image";

const MeetOurTeam = () => {
  // ===============================Team Members Data==============================
  const teamMembers = [
    {
      name: "Akash Saha",
      role: "CEO & Founder",
      image:
        "https://www.shutterstock.com/image-photo/cheerful-young-black-man-manager-600nw-2510693647.jpg", // Replace with actual image path
    },
    // Add more team members as needed
  ];

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[80vw]">
        {/* ===============================Section Header============================== */}
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="mb-3 font-bold text-2xl text-gray-900 sm:text-3xl lg:text-4xl">
            Meet Our Team
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-base sm:text-lg">
            The passionate people behind Tripbank
          </p>
        </div>

        {/* ===============================Team Grid============================== */}
        <div className="mx-auto ">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group mx-auto max-w-xs overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl"
            >
              {/* ===============================Member Image============================== */}
              <Image
                src={member.image}
                alt={member.name}
                width={550}
                height={550}
                className=""
              />

              {/* ===============================Member Info============================== */}
              <div className="p-4 text-center sm:p-6">
                <h3 className="mb-1 font-semibold text-gray-900 text-base sm:text-lg">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
