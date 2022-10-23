import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Elevate Experience</title>
        <meta name="description" content="Welcome to Elevate Experience." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="lg:center grid min-h-screen w-screen grid-rows-2 items-center justify-items-center pt-16 lg:flex lg:flex-row lg:pt-0"
        style={{
          gridTemplateRows: "auto auto",
        }}
      >
        <header className="w-full max-w-xl p-4 py-10 lg:w-4/5 lg:max-w-3xl lg:p-20">
          <h1>Freedom Ball</h1>
          <div className="row center w-full flex-wrap justify-between">
            <h3 className="pr-4">Scottsdale Ranch Park</h3>
            <h3>Jan 21, 2022</h3>
          </div>
          <p className="my-8 lg:my-16">
            fsjlafdkjsa;f dkfld jasfkd afjdsakfdljafdk afjdkalf djak fjdaklf dk
            dksafljd alkj dkajf dklsaljlkj lkfjd slkajfkldsjaflkjdsakljlk
            lksdjlkfjdlkj fl
          </p>
          <div className="row center justify-between">
            <Link href="/">
              <SecondaryButton>More Info</SecondaryButton>
            </Link>
            <Link href="/">
              <PrimaryButton>Register</PrimaryButton>
            </Link>
          </div>
        </header>
        <div className="relative h-full max-h-screen w-screen object-cover lg:h-screen">
          <Image
            src="/volleyball.png"
            layout="fill"
            objectFit="cover"
            alt="Event"
          />
        </div>
      </div>
    </>
  );
}
