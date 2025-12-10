import Link from "next/link";
import notFoundImage from "@/public/404.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className=" ">
      <h1 className=" text-center px-5 text-2xl md:text-3xl lg:text-6xl font-bold py-6">
        Ooops .......!
      </h1>
      <p className="text-center px-5 text-lg md:text-xl lg:text-2xl pb-6">
        The page you are looking for does not exist.
      </p>
      <Image
        src={notFoundImage}
        alt="404 Not Found"
        width={600}
        height={400}
        className="mx-auto w-[50vw]"
      />
      <div className=" my-6 px-5 flex justify-center ">
        <Button className=" bg-yellow-400 py-6 px-10 rounded-xl text-yellow-900">Go Back Home</Button>
      </div>
    </div>
  );
};

export default NotFound;
