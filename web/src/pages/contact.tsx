import DisplayFormError from "@/components/FormError";
import Socials from "@/components/Socials";
import Button from "@/components/buttons/Button";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="buffer-t col center w-full px-4">
      <h1 className="mb-4 text-center">We&apos;d Love to Hear From You!</h1>
      <ul className="my-4 italic">
        <li>Have a birthday coming up?</li>
        <li>Something you&apos;d like to see?</li>
        <li>Things we can improve on?</li>
        <li>Just want to say hi?</li>
      </ul>
      <form>
        <span className="font-condensed my-4 text-2xl font-bold">
          Hit us up!
        </span>
        <Socials />
        <div className="group">
          <label className="required">Message</label>
          <textarea required rows={4} placeholder="Give us some feedback..." />
        </div>
        <DisplayFormError error={null} />
        <div className="group">
          <Button className="primary">Send message</Button>
        </div>
      </form>
      <div className="col center h-40 w-screen justify-center bg-gray-900 p-4 text-gray-300">
        <span className="font-condensed text-xl font-thin">Need support?</span>
        <Link href="mailto: support@elevateexperience.app">
          <span className="cursor-pointer underline">
            support@elevateexperience.app
          </span>
        </Link>
      </div>
    </div>
  );
}
