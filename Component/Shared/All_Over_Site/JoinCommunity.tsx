import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const JoinCommunity = ({icon,title,description,buttontext_1,buttontext_2}:{icon: React.ReactNode, title: string, description: string, buttontext_1: string, buttontext_2: string}) => {

  return (
    <section className="bg-linear-to-br from-yellow-700 to-yellow-900 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-4xl text-center">
        {/* ===============================Community Icon============================== */}
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full  bg-opacity-20 sm:size-20 lg:mb-8">
          {icon}
        </div>

        {/* ===============================Section Title============================== */}
        <h2 className="mb-4 font-bold text-2xl text-white sm:text-3xl lg:mb-6 lg:text-4xl">
          {title}
        </h2>

        {/* ===============================Section Description============================== */}
        <p className="mb-8 text-base text-yellow-50 sm:text-lg lg:mb-10 lg:text-xl">
          {description}
        </p>

        {/* ===============================Action Buttons============================== */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link href="/signup">
            <Button className="h-11 w-full cursor-pointer bg-yellow-600 hover:bg-yellow-600 text-lg rounded-xl px-8 sm:h-12 sm:w-auto sm:px-10">
                {buttontext_1}
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              className="h-11  w-full rounded-xl hover:bg-transparent hover:text-white border-2 border-yellow-600 bg-transparent px-8 font-semibold text-white cursor-pointer  sm:h-12 sm:w-auto sm:px-10"
            >
              {buttontext_2}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
