import Link from "next/link";
import { ReactNode } from "react";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

// source: https://usbrandcolors.com
const colors = {
  facebook: {
    blue: "#4267B2",
    grey: "#898F9C",
    black: "#000000",
  },
  instagram: {
    royalBlue: "#405DE6",
    blue: "#5B51D8",
    purple: "#833AB4",
    darkPink: "#C13584",
    purpleRed: "#E1306C",
    red: "#FD1D1D",
    darkOrange: "#F56040",
    orange: "#F77737",
    yellow: "#FCAF45",
    lightYellow: "#FFDC80",
  },
};

function Social({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link href={href} target="_blank">
      <div className="m-1 cursor-pointer">{children}</div>
    </Link>
  );
}

export default function Socials() {
  return (
    <ul className="row center text-4xl">
      <li>
        <Social href="https://www.facebook.com/Elevate-Experience-101932656090364">
          <AiFillFacebook
            style={{
              fill: colors.facebook.blue,
            }}
          />
        </Social>
      </li>
      <li>
        <Social href="https://www.instagram.com/elevate_experiencellc/">
          <AiFillInstagram
            className="cursor-pointer"
            style={{ fill: colors.instagram.purple }}
          />
        </Social>
      </li>
    </ul>
  );
}
