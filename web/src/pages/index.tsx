import EventThumbnail from "@/components/events/EventThumbnail";
import { trpc } from "@/utils/trpc";
import Head from "next/head";

export default function Home() {
  const getQuery = trpc.useQuery(["events.getAll"]);

  return (
    <>
      <Head>
        <title>Welcome to Elevate Experience</title>
        <meta name="description" content="Welcome to Elevate Experience." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="buffer-y">
        <ul className="">
          {getQuery.data?.map((e) => (
            <li key={e.id} className="my-4">
              <EventThumbnail event={e} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
