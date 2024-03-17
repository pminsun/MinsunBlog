import { AWS_KEY, AWS_REG, AWS_SECRET_KEY } from "./config";
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const credentials = {
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
};

const s3Client = new S3Client({
  region: AWS_REG,
  credentials: credentials,
});

const bucketName = "s3.personalblog";
const folderPrefixImages = "images/";

const getObjectsInFolder = async () => {
  try {
    // 폴더 내 객체 목록을 가져오는 요청 설정
    const commandInput = {
      Bucket: bucketName,
      Prefix: folderPrefixImages,
    };
    const command = new ListObjectsV2Command(commandInput);

    // S3 클라이언트를 사용하여 폴더 내 객체 목록을 가져옴
    const data = await s3Client.send(command);

    let objectlists = [];
    for (let object of data.Contents) {
      // 폴더 객체인 경우 리스트에 추가하지 않음
      if (!object.Key.endsWith("/")) {
        objectlists.push(object.Key);
      }
    }

    return objectlists;
  } catch (error) {
    console.error(error);
  }
};
export { getObjectsInFolder };
