import PageHead from "@/components/PageHead";
import Socials from "@/components/Socials";
import Button from "@/components/buttons/Button";
import Link from "next/link";
import { HTMLAttributes, useEffect, useState } from "react";

function HeaderSlide(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${
        className || ""
      } header-slide row center absolute top-0 left-0 h-10 origin-top-left bg-primary text-3xl font-medium`}
      style={{
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function Header() {
  const [state, setState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setState((state) => state + 1), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <header
      id="home"
      className="row center header-box-container w-fit cursor-pointer items-start px-5"
      onClick={() => setState(state + 1)}
    >
      <h1 className="row center h-10 whitespace-nowrap text-3xl font-thin">
        Elevate your
      </h1>
      <div className="h-10 w-40">
        <ul
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transition: "0.75s ease-in-out transform",
            transform: `rotateX(${90 * state}deg)`,
          }}
        >
          <HeaderSlide>self</HeaderSlide>
          <HeaderSlide>&nbsp;game</HeaderSlide>
          <HeaderSlide>&nbsp;community</HeaderSlide>
          <HeaderSlide>&nbsp;life</HeaderSlide>
        </ul>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <>
      <PageHead
        title="Welcome to Elevate"
        description="Welcome to Elevate Experience."
      />
      <div className="col center h-screen w-screen justify-center overflow-hidden">
        <div className="group bg-yellow-500 p-4 text-primary">
          <h2>Under Construction</h2>
          <p>
            To sign up for the upcoming <b>Swingers Tournament</b>, please
            comment under{" "}
            <Link href="https://www.facebook.com/events/1684032278665916">
              <span className="cursor-pointer text-blue-700 underline">
                our Facebook post
              </span>
            </Link>{" "}
            or reach out to{" "}
            <Link href="https://www.facebook.com/events/1684032278665916">
              <span className="cursor-pointer text-blue-700 underline">
                Lanae on Facebook
              </span>
            </Link>
            .
          </p>
        </div>
        <div className="group">
          <Header />
        </div>
        <div className="group">
          <Button href="/events" className="primary">
            Events
          </Button>
        </div>
        <div className="group">
          <span className="font-condensed text-lg">Follow Us</span>
          <Socials />
        </div>
      </div>
    </>
  );
}
