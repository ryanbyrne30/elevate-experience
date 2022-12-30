import { Event } from "@prisma/client";
import { AiOutlineDoubleRight } from "react-icons/ai";
import ShareIcon from "../icons/ShareIcon";

export default function EventThumbnailActions({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event.name,
        text:
          event.description ||
          "Check out this awesome event by Elevate Experience!",
        url: `https://${window.location.hostname}/events/${event.id}`,
      });
    } else alert("No navigator");
  };

  return (
    <div className="row center w-full justify-between p-2">
      <span />
      <ShareIcon className="text-2xl" onClick={share} />
      <AiOutlineDoubleRight
        className="cursor-pointer text-2xl opacity-50"
        onClick={onClose}
      />
    </div>
  );
}
