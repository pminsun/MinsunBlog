import axios from "axios";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { DATABASE_ID_BLOG, TOKEN } from "./config";
import { fireStorage } from "../firebase/firebasedb";

export async function getCoverImages() {
  const fileRef = ref(fireStorage, "coverImage/");
  const result = await listAll(fileRef);
  const urls = await Promise.all(
    result.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return url;
    })
  );
  return urls;
}

export async function getAllData() {
  const coverImages = await getCoverImages();
  return { coverImages };
}
