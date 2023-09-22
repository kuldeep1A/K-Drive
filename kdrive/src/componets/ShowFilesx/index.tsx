import React, { useRef, useState } from "react";
import styles from "./ShowFilesx.module.scss";
import { FetchFiles } from "@/hooks/FetchFiles";
import { FaJava, FaPython } from "react-icons/fa";
import { RiJavascriptLine } from "react-icons/ri";
import { TbFileTypeHtml, TbFileTypeJsx } from "react-icons/tb";
import { GrStatusUnknown } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";
import { BsFolder, BsFiletypeExe, BsFiletypeXlsx, BsFiletypeCss, BsFiletypeMp3, BsFiletypeMp4, BsFiletypeDocx, BsFileTextFill, BsFiletypeJpg, BsFiletypePng, BsFiletypeGif, BsFiletypePdf } from "react-icons/bs"
import { useRouter } from "next/router";
import { useFetchSession } from "@/hooks/useFetchSession";

let count = 0;

export default function ShowFilesx({ parentId }: FolderStructure) {
    const session = useFetchSession();
    const [_shareName, setShareName] = useState("");
    const [currentFileId, setCurrentFileId] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const { fileList } = FetchFiles(parentId, session?.user?.email);
    
    fileList.map((file: {UserEmail: ".lkjljfsj"}) => {
        let com: unknown[] = [];
        if (file.UserEmail !== undefined) {
            const userEmail = file.UserEmail;
            com = userEmail.split('.')
            if (com[1] === "com"){
                if (count < 8) {
                    count = 1 + count                
                    if (count === 8 ){
                        console.log("fileList: ", fileList)
                    }
                }
            }
        }
    })
    

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
    const modalRef = useRef<HTMLDialogElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchName = (event: any) => {
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const parentDiv = event.currentTarget.parentNode;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const fileNameDiv = parentDiv.querySelector('[data-filename]') as HTMLDivElement;
        
        if (fileNameDiv) {
            const shareName = fileNameDiv.textContent ?? "";
            setShareName(shareName)
        }
    }

    const SharedEmail = () => {
        if (email.trim() === "") {
            setErrorMessage("Please enter an email address.");
        } else {
            
            setErrorMessage("");
            console.log(currentFileId);
            console.log("email: ", email);
        }
    }
   
    return (
        <div className={styles.All_Files}>
            {
                fileList.map((file: {imageLink: "", fileName: "", isFolder: false, folderName: "", id: ""}, index: number) => {
                    const keyx = `${file.id}-${index}`;
                    return ( 
                        <div key={keyx} className={styles.FoldersFiles}>
                            <div>
                                {<div className={styles.file} onClick={() => OpenFile(file.imageLink, file.isFolder) }>
                                        <div className={styles.manageIcon}>
                                            <div>{file.isFolder ? createFolder(file.folderName, file.id) : CheckType(file.fileName)}</div>
                                            <div data-filename={"___shareName"} className={styles.filename}><div>{file.fileName || file.folderName}</div></div>
                                        </div>
                                        {/* {file.imageLink === "" ? <></> : <Image className={styles.immageLink} src={file.imageLink} alt="icon" width={300} height={300} priority={true} /> } */}
                                </div>}
                                <div className={styles.email} onClick={fetchName}>
                                        <MdOutlineEmail onClick={()=>  {
                                            modalRef.current?.showModal();
                                            setCurrentFileId(file.id);
                                        }} size={35} />
                                </div>
                            </div>
                            <dialog ref={modalRef} className="modal">
                            <div className= {`modal-box ${styles.modelBox}`}>
                                <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Share {_shareName}</h3>
                                <div>
                                    <div className={styles.shareBox}>
                                        <input type="email" required={true} placeholder="Email" onChange={(event) => setEmail(event.type ===  "email" ? event.target.value : "")} className={`input input-bordered w-full max-w-xs ${styles.shareInput}`} />
                                        <button onClick={() => SharedEmail()} className="px-5">Share</button>
                                    </div>
                                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                                </div>
                            </div>
                            </dialog>
                        </div>
                    )
                })
            }
        </div>

    )
}