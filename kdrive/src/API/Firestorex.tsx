/* eslint-disable @typescript-eslint/await-thenable */
import { database } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
const files = collection(database, "files");
const Empty_no = collection(database, "empty_no");
const isVerifiedUserC = collection(database, "isVerifiedUser");
export const addFiles = async (
  imageLink: string,
  fileName: string,
  parentId: string,
  UserEmail: string | undefined | null,
) => {
  try {
    await addDoc(files, {
      imageLink: imageLink,
      fileName: fileName,
      parentId: parentId ?? "",
      UserEmail: UserEmail,
      SharedTo: [],
    });
  } catch (error) {
    alert(error);
  }
};
export const addFolder = async (folder: {
  folderName: string;
  isFolder: boolean;
  folderList: object;
  parentId: string;
  UserEmail: string | undefined | null;
}) => {
  try {
    await addDoc(files, {
      folderName: folder.folderName,
      isFolder: folder.isFolder,
      folderList: folder.folderList,
      parentId: folder.parentId,
      UserEmail: folder.UserEmail,
      SharedTo: [],
    });
  } catch (error) {
    alert(error);
  }
};
export const ShareFiles = async (email: string, currentFileId: string) => {
  try {
    const SharedFiledDoc = await doc(files, currentFileId);
    const response = await getDoc(SharedFiledDoc);
    await updateDoc(SharedFiledDoc, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      SharedTo: [...response.data()?.SharedTo, email],
    });
  } catch (error) {
    alert(error);
  }
};
export const addEmptyFolder = async (Empty_folder: { EmptyNo: number }) => {
  try {
    const EmptyDocument: Record<string, number> = {};
    const empty_folder_ref = doc(
      Empty_no,
      `${process.env.NEXT_PUBLIC_EMPTY_NO_ID}`,
    );
    const EmptyFiled = "empty_folder_no";
    EmptyDocument[EmptyFiled] = Empty_folder.EmptyNo + 1;
    await setDoc(empty_folder_ref, EmptyDocument, { merge: true });
  } catch (error) {
    alert(error);
  }
};
export const isVerified = async (User: {
  Name: string;
  UserEmail: string;
  IsVerified: boolean;
  IsConfirmationSend: boolean;
}) => {
  try {
    await addDoc(isVerifiedUserC, {
      Name: User.Name,
      UserEmail: User.UserEmail,
      IsVerified: User.IsVerified,
      IsConfirmationSend: User.IsConfirmationSend,
    })
  } catch (error) {
    alert(error);
  }
}