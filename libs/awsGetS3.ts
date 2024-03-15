import AWS from "aws-sdk";
import { AWS_KEY, AWS_REG, AWS_SECRET_KEY } from "./config";

AWS.config.update({
  region: AWS_REG,
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

const s3 = new AWS.S3();
const bucketName = "s3.personalblog";
const folderPrefixImages = "images/";

const getObjectsInFolder = async () => {
  try {
    const data = await s3
      .listObjectsV2({ Bucket: bucketName, Prefix: folderPrefixImages })
      .promise();

    let objectlists: any = [];
    for (let object of data.Contents as any) {
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
