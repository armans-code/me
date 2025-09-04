// archived
"use client";
import { useEffect, useState } from "react";

const g = 0.0013;
const v_i = 0.2;

const Particle = ({
  y_i,
  left,
  time,
}: {
  y_i: number;
  left: number;
  time: number;
}) => {
  const [y, setY] = useState(y_i);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = new Date().getTime() - time;
      const y = y_i + v_i * t + 0.5 * g * Math.pow(t, 2);
      if (y + 10 > window.innerHeight) {
        clearInterval(interval);
        setY(window.innerHeight - 10);
      } else {
        setY(y);
      }
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="whoareyou? absolute w-2.5 h-2.5 bg-white"
      style={{ top: y, left }}
    />
  );
};

export default function ParticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  const mouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLAnchorElement) {
      return;
    }
    const y_i = e.clientY;
    const time = new Date().getTime();
    setParticles((prev) => [
      ...prev,
      <Particle
        key={particles.length}
        y_i={y_i}
        left={e.clientX}
        time={time}
      />,
    ]);
  };

  return (
    <div className="absolute w-full h-full" onClick={mouseClick}>
      {children}
      {particles}
    </div>
  );
}
