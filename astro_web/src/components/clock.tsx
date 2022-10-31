import { useEffect, useState } from "preact/hooks";

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

function Unit({ value, text }: { value: number; text: string }) {
  return (
    <div className="col center p-2">
      <span className="text-sm opacity-60">{text}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}

export default function Clock() {
  const [className, setClassName] = useState("opacity-0");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const date = new Date(2023, 0, 22, 10);

  const calcDelta = () => {
    const current = new Date();
    const delta = date.getTime() - current.getTime();

    const d = Math.floor(delta / MS_IN_DAY);
    const h = Math.floor((delta - d * MS_IN_DAY) / MS_IN_HOUR);
    const m = Math.floor(
      (delta - (d * MS_IN_DAY + h * MS_IN_HOUR)) / MS_IN_MINUTE
    );
    const s = Math.floor(
      (delta - (d * MS_IN_DAY + h * MS_IN_HOUR + m * MS_IN_MINUTE)) /
        MS_IN_SECOND
    );
    setDays(d);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  useEffect(() => {
    const interval = setInterval(calcDelta, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setClassName("opacity-100"), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`row center transition-opacity ${className}`}>
      <Unit text="days" value={days} />
      <Unit text="hours" value={hours} />
      <Unit text="minutes" value={minutes} />
      <Unit text="seconds" value={seconds} />
    </div>
  );
}
