import Title from "@/components/ScreenElement/title";
import Image from "next/image";
import Link from "next/link";
import { IoIosSquare } from "react-icons/io";
import { saveAs } from "file-saver";

export default function Resume() {
  const downloadPDF = () => {
    fetch("/resume_06.18.pdf") // PDF 파일의 경로
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
              안녕하세요. 데이터를 효율적으로 처리하고 사용자 친화적인 UI/UX를
              구현하는 프론트엔드 엔지니어 박민선입니다. React의 재 사용성을
              고려한 컴포넌트 설계와 라이브러리 및 프레임워크의 안정성을
              고려하여 개발합니다. Next.js의 서버사이드 렌더링(SSR)을 활용해
              초기 로딩 속도를 개선하고 SEO 성능을 향상시키는 웹 구현을 실천하고
              있습니다.
            </p>
            <div className="line" />
            <section className="res-mid">
              <div className="flex-start flex-col">
                <p className="res-title">프로젝트 개요</p>
                <div className="res-con">
                  <div>
                    <p className="mb-2 text-lg font-semibold dark:!text-white">
                      회사 프로젝트
                    </p>
                    <ul className="flex flex-col gap-4">
                      <li>
                        <p className="project-title flex-line">
                          <IoIosSquare fontSize={12} />
                          벨로가 사이클 자전거 친화 도시 1010 관제 시스템 WEB
                        </p>
                        <p className="summary">
                          개요 : 11개 지역 라이딩 데이터를 차트와 Mapbox로
                          직관적 시각화하여 사용자가 기간 별 검색과 지도 상에서
                          경로 확인 가능하며 관제 시스템 페이지를 개발
                        </p>
                        <p className="tech">
                          Tech Stack : Next.js, React.js, emotion, typeScript
                        </p>
                      </li>
                      <li>
                        <p className="project-title flex-line">
                          <IoIosSquare fontSize={12} />
                          Pandora App / Pandora Admin WEB
                        </p>
                        <p className="summary">
                          개요 : 판교 자율주행 대중교통 예약 서비스 앱에는 QR
                          티켓 발급, 노선도 제공, 티켓 조회와 같은 기능을 개발,
                          이용자 관리는 별도의 웹 기반 관리자 페이지에서
                          처리하여 개발
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
                        <p className="project-title flex-line">
                          <IoIosSquare fontSize={12} />
                          VelogaAuto Admin Page WEB
                        </p>
                        <p className="summary">
                          개요 : 기획서에 따른 자사 앱과 연동되어 관리자가 스킨,
                          배너 등록이 가능한 기능이 있는 관리자페이지를 구축
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
                    <ul className="flex flex-col gap-4">
                      <li>
                        <div className="flex items-start lg:items-center flex-col lg:flex-row mb-2">
                          <p className="project-title flex-line !mb-0">
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
                        <p className="summary">
                          개요 : Notion API를 활용한 반응형 블로그 WEB
                        </p>
                        <p className="tech">
                          Github 링크 :{" "}
                          <Link
                            href="https://github.com/pminsun/MinsunBlog"
                            target="_blank"
                            className="hover:text-[#2c82f2] block lg:inline-block"
                          >
                            https://github.com/pminsun/MinsunBlog
                          </Link>
                        </p>
                        <p className="tech mt-1">
                          Tech Stack :{" "}
                          <span className="block lg:inline-block">
                            Next.js, typeScript, tailwind, aws ec2, zustand
                          </span>
                        </p>
                      </li>
                      <li>
                        <div className="flex items-start lg:items-center flex-col lg:flex-row mb-2">
                          <p className="project-title flex-line !mb-0">
                            <IoIosSquare fontSize={12} />
                            레시피 정보 검색, 저장 서비스 WEB
                          </p>
                          <span className="block lg:inline-block lg:ml-2">
                            ({" "}
                            <Link
                              href="https://www.myallfood.com/"
                              target="_blank"
                              className="hover:text-[#2c82f2]"
                            >
                              https://www.myallfood.com/
                            </Link>{" "}
                            )
                          </span>
                        </div>
                        <p className="summary">
                          개요 : Edamam api와 firebase를 활용한 레시피 정보
                          검색, 저장 서비스 WEB
                        </p>
                        <p className="tech">
                          Github 링크 :{" "}
                          <Link
                            href="https://github.com/pminsun/AllFood"
                            target="_blank"
                            className="hover:text-[#2c82f2] block lg:inline-block"
                          >
                            https://github.com/pminsun/AllFood
                          </Link>
                        </p>
                        <p className="tech mt-1">
                          Tech Stack :
                          <span className="block lg:inline-block">
                            Next.js, Javascript, React.js, zustand, react-query
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex-start flex-col">
                <p className="res-title">기술 스택</p>
                <p className="res-con">
                  Next.js, React, TypeScript, React-query, Zustand, Aws,
                  Emotion, Tailwind
                </p>
              </div>
              <div className="flex-start flex-col">
                <p className="res-title">경력</p>
                <div className="res-con">
                  <p className="mb-2 text-lg font-bold dark:!text-white">
                    옐로나이프
                  </p>
                  <p className="my-2 text-base">
                    팀원(퍼블 & 프론트 담당) | 연구개발센터 | 재직 중
                  </p>
                  <p className="mb-2 text-sm">
                    2021.10.01 - 현재{" "}
                    <span className="block lg:inline-block">
                      ( 2년 8개월 2024.05.30기준 )
                    </span>
                  </p>
                  <p className="text-sm">모빌리티 소프트웨어 서비스 스타트업</p>
                </div>
              </div>
              <div className="flex-start flex-col">
                <p className="res-title">학력</p>
                <div className="res-con">
                  <p className="mb-2 text-lg font-bold dark:!text-white">
                    서울과학기술대학교
                  </p>
                  <p className="mb-2 text-sm">2015.03 - 2020.02 | 학사</p>
                </div>
              </div>
            </section>
            <div className="line" />
            <section className="mt-6 mb-11">
              <p className="font-bold text-lg mb-5 !text-[#2c82f2]">프로젝트</p>
              <ul className="flex flex-col gap-[60px]">
                <li>
                  <div className="detailproject-con">
                    <div>
                      <p className="detailproject-title">
                        [사이드] 개인 블로그 웹사이트
                      </p>
                      <p className="mb-1">
                        Notion API를 활용한 반응형 블로그 WEB
                      </p>
                      <p>
                        Tech Stack : Next.js, typeScript, tailwind, zustand, aws
                        ec2, aws S3
                      </p>
                    </div>
                    <div className="detailproject-btnArea">
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
                  </div>
                  <div className="project-img">
                    <Image
                      src={"/homeScreen.png"}
                      alt="homeScreen"
                      width={600}
                      height={100}
                    />
                  </div>
                </li>
                <li className="border-t border-black border-dashed pt-[40px]">
                  <div className="detailproject-con">
                    <div>
                      <p className="detailproject-title">
                        [사이드] AllFood 웹사이트
                      </p>
                      <p className="mb-1">레시피 정보 검색, 저장 하는 WEB</p>
                      <p>
                        Tech Stack : Next.js, typeScript, tailwind, zustand, aws
                        ec2, aws S3
                      </p>
                    </div>
                    <div className="detailproject-btnArea">
                      <Link
                        href="https://github.com/pminsun/AllFood"
                        target="_blank"
                        className="move-btn"
                      >
                        Source Code
                      </Link>
                      <Link
                        href="https://minsunblog.com/project/49b53229-e993-4e98-ad6d-74687ad9364a?img=allfoodScreenShot.png"
                        target="_blank"
                        className="move-btn"
                      >
                        About Project
                      </Link>
                    </div>
                  </div>
                  <div className="project-img">
                    <Image
                      src={"/allfoodScreenShot.png"}
                      alt="allfoodScreenShot"
                      width={600}
                      height={100}
                    />
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
