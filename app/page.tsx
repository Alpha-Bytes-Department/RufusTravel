import Landing from "@/Component/LandingPage/Landing";
import { useAxios } from "@/Hooks/useAxios";
import { useAuth } from "@/Providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className=" mx-auto ">
     <Landing />
    </div>
  );
}
