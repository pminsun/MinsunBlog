import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useState } from "react";
import { HiOutlineSun, HiOutlineStar } from "react-icons/hi";

export default function DarkModeToggleBtn() {
  const { theme, setTheme } = useTheme();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex p-1"
    >
      {loaded ? (
        <>
          {theme === "dark" ? (
            <HiOutlineStar className="text-2xl text-yellow-500" />
          ) : (
            <HiOutlineSun className="text-2xl" />
          )}
        </>
      ) : null}
    </button>
  );
}
