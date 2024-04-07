## 박민선 프론트엔드 개인블로그

<!-- Table of Contents -->

## :notebook_with_decorative_cover: 목차

- [About the Project](#star2-about-the-project)
  - [개인 블로그 Screenshots](#camera-개인-블로그-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [블로그 특징](#dart-블로그-특징)
  - [주요 색상](#art-주요-색상)
  - [Environment Variables](#key-environment-variables)
- [개발 Roadmap](#compass-개발-roadmap)
- [Getting Started](#toolbox-getting-started)
  - [Installation](#gear-installation)
  - [Running Dev](#test_tube-running-tests)
  - [Deployment](#triangular_flag_on_post-deployment)
- [License](#warning-license)
- [Contact](#handshake-contact)

<!-- About the Project -->

## :star2: About the Project

<h3>개인블로그</h3>
<p>해당 프로젝트는 notion.api를 활용해서 만든 Next.js 웹페이지입니다.</p>

<!-- Screenshots -->

### :camera: 개인 블로그 Screenshots

<div align="center"> 
  <img width="1280" alt="blogcapture" src="https://github.com/pminsun/MinsunBlog/assets/125803499/0e5b2a71-f8ae-4f47-8828-ae445538b1e5" alt="screenshot">
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<p>기술스택</p>

- Typescript
- Next.js
- React.js
- TailwindCSS

<p>사용한 메인 라이브러리</p>

- react-apexcharts v3.44
- axios v1.5
- zustand v4.4
- next-themes v0.2.1

<!-- Features -->

### :dart: 블로그 특징

- Notion APi로 데이터를 불러와 Next.js로 제작 후 EC2로 배포한 블로그입니다.
- 라이트, 다크 모드가 있는 반응형 웹사이트입니다.
- 태그별로 블로그를 필터링 할 수 있습니다.
- heatmap으로 만든 달력을 통해 일자별 포스팅 수, 포스팅 된 글을 확인 할 수 있습니다.

<!-- Color Reference -->

### :art: 주요 색상

| LightColor      | Hex                                                              |
| --------------- | ---------------------------------------------------------------- |
| Primary Color   | ![#fbfbfa](https://via.placeholder.com/10/fbfbfa?text=+) #fbfbfa |
| Secondary Color | ![#f3f4f6](https://via.placeholder.com/10/f3f4f6?text=+) #f3f4f6 |
| Accent Color    | ![#2c82f2](https://via.placeholder.com/10/2c82f2?text=+) #2c82f2 |
| Text Color      | ![#000000](https://via.placeholder.com/10/000000?text=+) #000000 |

| DarkColor       | Hex                                                               |
| --------------- | ----------------------------------------------------------------- |
| Primary Color   | ![#0f172a](https://via.placeholder.com/10/0f172a?text=+) #0f172a  |
| Secondary Color | ![#1f2937](https://via.placeholder.com/10/1f2937?text=+) #1f2937  |
| Accent Color    | ![#2c82f2](https://via.placeholder.com/10/2c82f2?text=+) #02c82f2 |
| Text Color      | ![#94a3b8](https://via.placeholder.com/10/94a3b8?text=+) #94a3b8  |

<!-- Env Variables -->

### :key: Environment Variables

<p>사용된 환경 설정</p>

`NEXT_PUBLIC_NOTION_TOKEN`
`NEXT_PUBLIC_NOTION_DATABASE_ID_PROJECT`
`NEXT_PUBLIC_NOTION_DATABASE_ID_BLOG`
`NEXT_PUBLIC_BASE_URL`

`NEXT_PUBLIC_AWS_REG`
`NEXT_PUBLIC_AWS_KEY`
`NEXT_PUBLIC_AWS_SECRET_KEY`
`AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE`

<!-- Roadmap -->

## :compass: 개발 Roadmap

- [x] 홈페이지 - lottieAny 적용
- [x] 공통 - 라이트 / 다크 모드 적용
- [x] 상세페이지 - 코드 문 jsx (react) html문 etc 적용 / video 추가 / codepen 추가
- [x] 리스트페이지 - 검색 창 (Blog, Projects 페이지) & 태그 필터 적용
- [x] 리스트페이지 - pagination (Blog, Projects 페이지)
- [x] 공통 - mobile, tablet 반응형
- [x] 공통 - 오른쪽 하단에 상단 이동 버튼 추가
- [x] 리스트페이지 - 이미지 blurDataURL 적용하기
- [x] 상세페이지 - 하단에 다음 / 이전 포스트 링크
- [x] 홈페이지 - heatmap으로 월별 달력 생성: 일별 포스팅 수 tooltip
- [x] 홈페이지 - 달력 클릭 시 해당 포스팅 내역 보이게
- [x] 공통 - EC2 배포
- [x] 홈페이지 - 월 선택 모달 오늘 기준 달까지 표기
- [x] 프로젝트 페이지 - aws S3에서 이미지 불러오기
- [ ] 홈페이지 - 달력 2023.09 4주차, 오늘 이후 날짜 선택 불가
- [ ] 상세페이지 - 이미지 클릭 시 크게 보이는 모달
- [ ] 공통 - 페이지 이동 속도 개선

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Installation -->

### :gear: Installation

```bash
  npm install MinsunBlog
  cd MinsunBlog
```

<!-- Running Tests -->

### :test_tube: Running Dev

```bash
  npm run dev
```

<!-- Deployment -->

### :triangular_flag_on_post: Deployment

To deploy this project run

```bash
  npm run build
  npm start
```

<!-- License -->

## :warning: License

MIT 라이센스에 따라 배포됩니다. 자세한 내용은 LICENSE 을 확인하세요

<!-- Contact -->

## :handshake: Contact

박민선(Minsun Park) - pminsun309@gmail.com

Project Link: [https://minsunblog.com/](https://minsunblog.com/)
