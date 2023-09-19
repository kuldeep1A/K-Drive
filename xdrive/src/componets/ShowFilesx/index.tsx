import React from "react";
import styles from "./ShowFilesx.module.scss";
import { FetchFiles } from "@/hooks/FetchFiles";
import { FaJava, FaPython } from "react-icons/fa";
import { RiJavascriptLine } from "react-icons/ri";
import { TbFileTypeHtml, TbFileTypeJsx } from "react-icons/tb";
import { GrStatusUnknown } from "react-icons/gr";
import { BsFolder, BsFiletypeExe, BsFiletypeXlsx, BsFiletypeCss, BsFiletypeMp3, BsFiletypeMp4, BsFiletypeDocx, BsFileTextFill, BsFiletypeJpg, BsFiletypePng, BsFiletypeGif, BsFiletypePdf } from "react-icons/bs"
import { useRouter } from "next/router";

export default function ShowFilesx({ parentId }: FolderStructure) {
    const { fileList } = FetchFiles(parentId);

    const router = useRouter();

    const OpenFile = (filelink: string, isFolder: boolean) => {
        if (!isFolder){
            window.open(filelink);
        }
    }
    const CheckType = (fileName: string) => {
        if (fileName !== undefined) {
            const fileExtenstion = fileName.split(".").pop();
            switch (fileExtenstion) {
                case "png":
                    return <BsFiletypePng className={styles.icon} size={80} />;
                case "jpg":
                    return <BsFiletypeJpg className={styles.icon} size={80} />;
                case "gif":
                    return <BsFiletypeGif className={styles.icon} size={80} />
                case "pdf":
                    return <BsFiletypePdf className={styles.icon} size={80} />
                case "txt":
                    return <BsFileTextFill className={styles.icon} size={80} />
                case "doc":
                    return <BsFiletypeDocx className={styles.icon} size={80} />
                case "docx":
                    return <BsFiletypeDocx className={styles.icon} size={80} />
                case "xlsx":
                    return <BsFiletypeXlsx className={styles.icon} size={80} />
                case "mp4":
                    return <BsFiletypeMp4 className={styles.icon} size={80} />
                case "mp3":
                    return <BsFiletypeMp3 className={styles.icon} size={80} />
                case "py":
                    return <FaPython className={styles.icon} size={80} />
                case "java":
                    return <FaJava className={styles.icon} size={80} />
                case "css":
                    return <BsFiletypeCss className={styles.icon} size={80} />
                case "html":
                    return <TbFileTypeHtml className={styles.icon} size={80} />
                case "jsx":
                    return <TbFileTypeJsx className={styles.icon} size={80} />
                case "js":
                    return <RiJavascriptLine className={styles.icon} size={80} />
                case "exe":
                    return <BsFiletypeExe className={styles.icon} size={80} />
                default:
                    return <GrStatusUnknown className={styles.icon} size={80} />;
            }
        }
    }
    const createFolder = (folderName: string, id: string) => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return <BsFolder onClick={() => router.push(folderName === "" ? `/empty?id=${id}` : `/${folderName}?id=${id}`)} className={styles.icon} size={80}/>
    }
   
    return (
        <div className={styles.All_Files}>
            {
                fileList.map((file: {imageLink: "", fileName: "", isFolder: false, folderName: "", id: ""}, index: number) => {
                    const keyx = `${file.id}-${index}`;
                    return ( 
                        <div key={keyx}>
                           {<div className={styles.file} onClick={() => OpenFile(file.imageLink, file.isFolder) }>
                                {file.isFolder ? createFolder(file.folderName, file.id) : CheckType(file.fileName)}
                                <div className={styles.filename}><div>{file.fileName || file.folderName}</div></div>
                                {/* {file.imageLink === "" ? <></> : <Image className={styles.immageLink} src={file.imageLink} alt="icon" width={300} height={300} priority={true} /> } */}
                           </div>}
                        </div>
                    )
                })
            }
        </div>

    )
}