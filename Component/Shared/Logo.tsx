import { FaSquare } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

interface LogoProps {
    textColor?: string;
}

const Logo = ({ textColor }: LogoProps) => {
  return (
    <div
      className={`flex items-center gap-2 font-bold text-base md:text-2xl ${textColor} `}
    >
    <svg
      className="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
        fill="#FFCD05"
      />
      <path
        d="M28.6375 14.6154L20.0072 22.317L5.22168 17.2362L33.5576 9.69531L26.0669 37.6246L22.6831 25.7209"
        fill="white"
      />
      <path
        d="M18.3799 30.1676V24.4141H12.6264V30.1676H18.3799Z"
        fill="#010101"
      />
      <path
        d="M28.9136 13.6007L20.2833 21.3072L8.0332 15.5536L33.8337 8.68555L26.6845 35.3195L22.7886 25.1127"
        fill="#010101"
      />
    </svg>

      <p>Tripbank</p>
    </div>
  );
}

export default Logo