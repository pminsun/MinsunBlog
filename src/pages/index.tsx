import Link from "next/link";
import LottiAnimation from "../components/lottieAny";
import Title from "../components/title";
import Seo from "@/components/seo";

export default function About() {
  return (
    <>
      <Seo title={`MinSun's Blog | About`} />
      <div>
        <Title title={"About"} subMent={"저를 소개합니다"} />
        <div className="flex items-center justify-center gap-5 flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-4 text-sm leading-6">
            <p className="text-center lg:text-left">
              안녕하세요. 새로운 기술을 학습하는 것을 좋아하는 프론트엔드
              개발자입니다. 사용자의 니즈와 복잡한 것을 단순하고 간편하게 만드는
              것에 관심이 많으며, 정보를 공유하는 것에 즐거움을 느낍니다.
            </p>
            <div className="flex justify-center lg:justify-start gap-2 mt-6">
              {/* <Link
              href="/resume"
              className="block py-2 w-[80px] text-center rounded-lg text-xs text-white bg-slate-400 hover:bg-point-color"
            >
              이력서
            </Link> */}
              <Link
                href="/project"
                className="block py-2 w-[80px] text-center rounded-lg text-xs text-white bg-slate-400 hover:bg-[#2c82f2]"
              >
                프로젝트
              </Link>
            </div>
          </div>
          <div className="w-2/3 lg:w-1/2">
            <LottiAnimation />
          </div>
        </div>
      </div>
    </>
  );
}
