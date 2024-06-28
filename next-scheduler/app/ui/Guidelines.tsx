import { useEffect, useRef, useMemo } from "react";
import { getHours, setO, setGuides } from "../lib/utils";

export default function Guidelines() {
    const hours = useMemo<number[]>(() => getHours(), []);// prevent the getHours from rerendering?
    const ref = useRef<HTMLDivElement>(null); //what does this do

    useEffect(() => {
        setGuides(ref.current as HTMLDivElement);
        setO(ref.current?.getBoundingClientRect().x as number);
      }, []);

      return (
        <div ref={ref} className="guidelines">
          {hours.map((i, index) => (
            <span key={index} className="guideline">
              <span>{i}</span>
            </span>
          ))}
        </div>
      );  
}