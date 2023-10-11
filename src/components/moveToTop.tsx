/* eslint-disable react-hooks/rules-of-hooks */
import { cls } from "libs/utils";
import { useEffect, useState } from "react";
import { HiChevronUp } from "react-icons/hi";

export default function MoveToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const showBtnClick = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", showBtnClick);
    return () => {
      window.removeEventListener("scroll", showBtnClick);
    };
  }, []);
  return (
    <div
      onClick={moveToTop}
      className={cls(
        showTopBtn ? "opacity-100" : "opacity-0",
        "fixed bottom-7 right-4 lg:right-10 p-2 z-20 cursor-pointer hover:scale-90 transition-all duration-500 rounded-full bg-[#2c82f2]"
      )}
    >
      <HiChevronUp className="text-2xl text-white" />
    </div>
  );
}
