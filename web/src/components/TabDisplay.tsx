import { atom, useAtom } from "jotai";
import { HTMLAttributes } from "react";

const tabNumberAtom = atom(0);

export function TabPage(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...rest } = props;
  return (
    <div
      className={`${className || ""} max-h-96 w-screen overflow-y-scroll`}
      {...rest}
    >
      {children}
    </div>
  );
}

function TabTitle({ title, index }: { title: string; index: number }) {
  const [tabNumber, setTabNumber] = useAtom(tabNumberAtom);

  return (
    <span
      onClick={() => setTabNumber(index)}
      className={`cursor-pointer rounded p-2 text-center transition-all ${
        tabNumber === index ? "bg-gray-700" : ""
      }`}
    >
      {title}
    </span>
  );
}

export default function TabDisplay(
  props: HTMLAttributes<HTMLDivElement> & {
    titles: string[];
  }
) {
  const { children, className, titles, ...rest } = props;
  const [tabNumber] = useAtom(tabNumberAtom);

  return (
    <div className={`${className || ""}`} {...rest}>
      <div
        className={`grid w-full grid-flow-col grid-rows-1 rounded bg-gray-900 p-1`}
      >
        {titles.map((title, idx) => (
          <TabTitle key={idx} title={title} index={idx} />
        ))}
      </div>
      <div className="w-full overflow-x-hidden">
        <div
          className="row flex-nowrap items-start transition-transform"
          style={{
            width: `${100 * titles.length}%`,
            transform: `translateX(${(-100 * tabNumber) / titles.length}%)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
