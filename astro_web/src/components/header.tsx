import { useEffect, useState } from "preact/compat";

export default function Header() {
  const [state, setState] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => setState((state) => state + 1), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <header
      class="row items-start header-box-container cursor-pointer"
      onClick={() => setState(state + 1)}
    >
      <h1 className="parent-pretext font-thin whitespace-nowrap">
        Elevate your
      </h1>
      <ul className="parent" style={{ transform: `rotateX(${90 * state}deg)` }}>
        <li className="child">self</li>
        <li className="child">&nbsp;game</li>
        <li className="child">&nbsp;community</li>
        <li className="child">&nbsp;life</li>
      </ul>
    </header>
  );
}
