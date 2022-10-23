import Image from "next/image";

export default function EventPodium() {
  return (
    <div className="col">
      <div className="row center my-1 bg-gradient-to-r from-amber-500">
        <div className="aspect-square w-1/2">
          <Image
            className="h-full w-full object-cover"
            src="/lily.jpeg"
            alt="First place photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="col p-2">
          <span className="font-light opacity-60">First Place</span>
          <span className="text-xl">Werewolves</span>
        </div>
      </div>

      <div className="row center my-1 bg-gradient-to-r from-zinc-500">
        <div className="aspect-square w-2/5">
          <Image
            className="h-full w-full object-cover"
            src="/lily.jpeg"
            alt="Second place photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="col p-2">
          <span className="text-sm font-light opacity-60">Second Place</span>
          <span className="text-lg">Wolves</span>
        </div>
      </div>

      <div className="row center my-1 bg-gradient-to-r from-orange-800">
        <div className="aspect-square w-1/3">
          <Image
            className="h-full w-full object-cover"
            src="/lily.jpeg"
            alt="Third place photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="col p-2">
          <span className="text-sm font-light opacity-60">Third Place</span>
          <span className="text-lg">Hounds</span>
        </div>
      </div>
    </div>
  );
}
