import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import Image from "next/image";

export default function LottiAnimation() {
  const [animationData, setAnimationData] = useState<object>();
  useEffect(() => {
    import("public/aboutAni.json").then(setAnimationData);
  }, []);

  if (!animationData)
    return (
      <div className="w-fll h-[201px] md:h-[467px] lg:h-[336px] flex items-center justify-center">
        <Image
          src={"/gear-solid.svg"}
          alt="setting"
          width={50}
          height={50}
          className="animate-spin"
        />
      </div>
    );
  return (
    <Lottie
      loop
      animationData={animationData}
      play
      style={{ width: "100%", height: "100%" }}
    />
  );
}
