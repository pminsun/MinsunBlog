import AWS from "aws-sdk";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Test() {
  // const config = {
  //   aws_reg: "ap-northeast-2", // aws 지역 ex ) ap-northeast-2
  //   aws_key: "", // aws 키
  //   aws_sec: "", // aws 시크릿 키
  // };

  // AWS.config.update({
  //   region: config.aws_reg,
  //   accessKeyId: config.aws_key,
  //   secretAccessKey: config.aws_sec,
  // });

  // const s3 = new AWS.S3();

  // const bucketName = "s3.personalblog";
  // const folderPrefix = "images/";

  // //* 버켓의 객체 리스트 출력

  // const getObjectsInFolder = async () => {
  //   try {
  //     const data = await s3
  //       .listObjectsV2({ Bucket: bucketName, Prefix: folderPrefix })
  //       .promise();
  //     console.log("Object Lists : ", data);

  //     let objectlists: any = [];
  //     for (let object of data.Contents) {
  //       // 폴더 객체인 경우 리스트에 추가하지 않음

  //       if (!object.Key.endsWith("/")) {
  //         objectlists.push(object.Key);
  //       }
  //     }

  //     return objectlists;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const [imageData, setImageData] = useState<string[] | null>(null);
  // useEffect(() => {
  //   const fetchObjects = async () => {
  //     try {
  //       const res = await getObjectsInFolder();
  //       setImageData(res);
  //     } catch (error) {
  //       console.error("Error fetching objects:", error);
  //     }
  //   };

  //   fetchObjects();
  // }, []);

  // const cloudfrontBaseUrl = "https://dxf0ufub2j2u1.cloudfront.net";

  return (
    <div className="h-[500px] bg-red-300">
      {/* {imageData?.map((x: any) => (
        <div key={x}>
          <Image
            src={`${cloudfrontBaseUrl}/${x}`}
            width={300}
            height={300}
            alt="image"
          />
        </div>
      ))} */}
    </div>
  );
}
