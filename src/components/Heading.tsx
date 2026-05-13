import type { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  children: string;
};

const colorClasses = [
  "text-cube-green",
  "text-cube-orange",
  "text-cube-blue",
  "text-cube-red",
];

const getCharColorClass = (index: number) =>
  twMerge(colorClasses[index % colorClasses.length]);

const Heading: FC<Props> = ({ children, className }) => {
  return (
    <h1
      className={twMerge(
        "text-center font-extrabold text-2xl tracking-widest text-yellow-300 underline underline-offset-18",
        className,
      )}
    >
      {[...children].map((char, i) => {
        return (
          <span key={i} className={getCharColorClass(i)}>
            {char}
          </span>
        );
      })}
    </h1>
  );
};

export default Heading;
