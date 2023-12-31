/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { storage } from "@/firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addFiles } from "@/API/Firestorex";
let progress = 0;
export default function FileUpload(
  file: any,
  setProgress: Function,
  setVisibleL: Function,
  parentId: string,
  UserEmail: string | undefined | null,
  Name: string | undefined | null,
) {  
  const folderPath = `files/${Name}/${file.name}`;
  const folderRef = ref(storage, folderPath);
  const uploadTask = uploadBytesResumable(folderRef, file);
  uploadTask.on(
    "state_changed",
    (sanpshot) => {
      progress = Math.round(
        (sanpshot.bytesTransferred / sanpshot.totalBytes) * 100,
      );
      if (progress === 100) {
        setVisibleL(false);
        setProgress(progress);
      } else {
        setVisibleL(true);
        setProgress(progress);
      }
    },
    (error) => {
      alert(error);
    },
    () => {
      if (progress === 100) {
        void getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          void addFiles(downloadURL, file.name, parentId ?? "", UserEmail);
        });
      }
    },
  );
}
