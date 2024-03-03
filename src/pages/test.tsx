import { ref, listAll, getDownloadURL } from "firebase/storage";
import { fireStorage } from "../../firebase/firebasedb";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

export default function Test({ images }: Props) {
  console.log("이미지 다운로드 URL:", images);

  const [url, setUrl] = useState("");
  const g = async () => {
    const imageURL = await getDownloadURL(
      ref(fireStorage, "스크린샷 2024-01-09 160020.png")
    );
    setUrl(imageURL);
  };
  useEffect(() => {
    g();
  }, []);

  return (
    <div className="flex flex-col gap-3 ml-5">
      <Image src={url} alt="1" width={200} height={200} />
      <Image src={images[0]} alt="1" width={200} height={200} />
      <Image src={images[1]} alt="1" width={200} height={200} />
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
