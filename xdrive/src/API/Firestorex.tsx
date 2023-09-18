import { database } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const files = collection(database, 'files');

export const addFiles = async (imageLink: string, fileName: string) => {
    try {
        await addDoc(files, {
            imageLink: imageLink,
            fileName: fileName,
            isFolder: false,
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

export const addFolder = async (folder: { 
    folderName: string;
    isFolder: boolean;
    folderList: object; 
}) => {
    try {
        await addDoc(files, {
            folderName: folder.folderName,
            isFolder: folder.isFolder,
            folderList: folder.folderList,
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}