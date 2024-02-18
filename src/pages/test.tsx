import { collection, getDocs } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { fireStore, fireStorage } from "../../firebase/firebasedb";
import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function Test({ images }: Props) {
  console.log("이미지 다운로드 URL:", images);

  return (
    <div>
      <p>Test</p>
    </div>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const fileRef = ref(fireStorage, "coverImage/");
  // image/ 하위에 있는 모든 파일에 대한 참조
  const result = await listAll(fileRef);
  const urls = await Promise.all(
    result.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return url;
    })
  );

  console.log(urls);

  return {
    props: {
      images: urls,
    },
  };
}

// function photo({ images }: Props) {
//   return <Photo images={images} />;
// }
