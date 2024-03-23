import Title from "@/components/ScreenElement/title";
import Image from "next/image";
import Link from "next/link";
import { IoIosSquare } from "react-icons/io";
import { saveAs } from "file-saver";

export default function Resume() {
  const downloadPDF = () => {
    fetch("/resume.pdf") // PDF 파일의 경로
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, "박민선_프론트엔드_이력서.pdf"); // 다운로드될 파일명
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  return (
    <>
      <div className="laptop-max-width h-full overflow-x-hidden">
        <Title title={"Resume"} />
        <section className="px-5 lg:px-0 pb-8">
          <div
            onClick={downloadPDF}
            className="my-10 w-[150px] move-btn cursor-pointer"
          >
            이력서 다운로드
          </div>

          <div className="mt-10">
            <h2 className="text-3xl lg:text-4xl font-bold">
              박민선 |{" "}
              <span className="block mt-4 dark:!text-white lg:mt-0 lg:inline-block">
                프론트엔드 개발자
              </span>
            </h2>
            <section className="flex-between flex-col lg:flex-row mt-10 res-top">
              <div className="w-full lg:w-auto">
                <p className="dark:!text-[#2c82f2]">Info.</p>
                <ul>
                  <li>
                    <span className="left-title">Birth.</span>
                    <span className="text-sm lg:text-base">
                      95.03.09 (만, 29)
                    </span>
                  </li>
                  <li>
                    <span className="left-title">Mail.</span>
                    <Link
                      href="mailto:pminsun309@gmail.com"
                      className="text-sm lg:text-base"
                    >
                      pminsun309@gmail.com
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-4 lg:mt-0 w-full lg:w-auto">
                <p className="dark:!text-[#2c82f2]">Channel.</p>
                <ul>
                  <li>
                    <span className="left-title">Blog.</span>
                    <Link
                      href="https://minsunblog.com/"
                      target="_blank"
                      className="text-sm lg:text-base"
                    >
                      https://minsunblog.com/
                    </Link>
                  </li>
                  <li>
                    <span className="left-title">GitHub.</span>
                    <Link
                      href="https://github.com/pminsun"
                      target="_blank"
                      className="text-sm lg:text-base"
                    >
                      https://github.com/pminsun
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
            <p className="my-10 break-keep">
              사용자의 경험을 고려하여 데이터를 효율적으로 처리하고 최단 시간에
              가져와 화면에 구현하는 것을 지향하는 프론트엔드 엔지니어
              박민선입니다. 라이브러리와 프레임워크의 버전 및 안정성을 고려하여
              개발 프로세스를 최적화하며, 연관된 직군들과 지속적으로 소통하여
              사용자를 위한 웹 구현을 실천하고 있습니다.
            </p>
            <div className="line" />
            <section className="res-mid">
              <div className="flex-start flex-col lg:flex-row">
                <p className="res-title">주요 프로젝트</p>
                <div className="res-con">
                  <div>
                    <p className="mb-2 text-lg font-semibold dark:!text-white">
                      회사 프로젝트
                    </p>
                    <ul className="flex flex-col gap-4">
                      <li>
                        <p className="flex-line gap-2 mb-2">
                          <IoIosSquare fontSize={12} />
                          벨로가 사이클 수원 시 캠페인 관제 시스템 WEB
                        </p>
                        <p className="tech">
                          Tech Stack : Next.js, React.js, emotion, typeScript
                        </p>
                      </li>
                      <li>
                        <p className="flex-line gap-2 mb-2">
                          <IoIosSquare fontSize={12} />
                          Pandora App / Pandora Admin WEB
                        </p>
                        <p className="tech mb-1">
                          Tech Stack(App) : React-Native, styled-components
                        </p>
                        <p className="tech">
                          Tech Stack(WEB) : React.js, typeScript, react-query,
                          styled-components
                        </p>
                      </li>
                      <li>
                        <p className="flex-line gap-2 mb-2">
                          <IoIosSquare fontSize={12} />
                          VelogaAuto Admin Page WEB
                        </p>
                        <p className="tech">
                          Tech Stack : ejs, JavaScript, Html, Css
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 mt-8 text-lg font-semibold dark:!text-white">
                      사이드 프로젝트
                    </p>
                    <ul>
                      <li>
                        <div className="flex items-start lg:items-center flex-col lg:flex-row mb-2">
                          <p className="flex-line gap-2">
                            <IoIosSquare fontSize={12} />
                            개인 블로그 WEB
                          </p>
                          <span className="block lg:inline-block lg:ml-2">
                            ({" "}
                            <Link
                              href="https://minsunblog.com/"
                              target="_blank"
                              className="hover:text-[#2c82f2]"
                            >
                              https://minsunblog.com/
                            </Link>{" "}
                            )
                          </span>
                        </div>
                        <p className="tech">
                          Tech Stack : Next.js, typeScript, tailwind, aws ec2,
                          zustand
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex-start flex-col lg:flex-row">
                <p className="res-title">기술 스택</p>
                <div className="res-con">
                  <Image
                    src={"/techStackImage.png"}
                    alt="techStack"
                    width={450}
                    height={100}
                  />
                </div>
              </div>
              <div className="flex-start flex-col lg:flex-row">
                <p className="res-title">경력</p>
                <div className="res-con">
                  <p className="mb-2 text-lg dark:!text-white">옐로나이프</p>

                  <p className="mb-2 text-sm">
                    2021.10.01 - 현재{" "}
                    <span className="block lg:inline-block">( 2년 6개월 )</span>
                  </p>
                  <p className="mt-2 text-sm">
                    퍼블리셔 / 모빌리티 소프트웨어 서비스 스타트업
                  </p>
                </div>
              </div>
              <div className="flex-start flex-col lg:flex-row">
                <p className="res-title">학력</p>
                <div className="res-con">
                  <p className="mb-2 text-lg dark:!text-white">
                    서울과학기술대학교
                  </p>
                  <p className="mb-2 text-sm">2015.03 - 2020.02 </p>
                  <p className="mt-2 text-sm">학사 / 금속공예디자인학과</p>
                </div>
              </div>
            </section>
            <div className="line" />
            <section className="mt-6 mb-11">
              <p className="font-bold text-lg mb-5 !text-[#2c82f2]">프로젝트</p>
              <div>
                <p className="font-semibold text-lg mb-6 dark:!text-white">
                  [사이드] 개인 블로그 웹사이트
                </p>
                <p className="mb-1">Notion API를 활용한 반응형 블로그 WEB</p>
                <p>
                  Tech Stack : Next.js, typeScript, tailwind, zustand, aws ec2,
                  aws S3
                </p>
                <div className="flex-line my-8 gap-4">
                  <Link
                    href="https://github.com/pminsun/MinsunBlog"
                    target="_blank"
                    className="move-btn"
                  >
                    Source Code
                  </Link>
                  <Link
                    href="https://minsunblog.com/project/12e40e01-8c7c-457e-bada-784889fbe08a?img=blogHome.png"
                    target="_blank"
                    className="move-btn"
                  >
                    About Project
                  </Link>
                </div>
                <div>
                  <Image
                    src={"/homeScreen.png"}
                    alt="homeScreen"
                    width={600}
                    height={100}
                  />
                </div>
              </div>
              <div></div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
