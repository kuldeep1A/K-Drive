import React, { useEffect, useState } from "react";
import styles from "./UploadX.module.scss";
import Button from "../common/Button";
import FileUpload from "@/API/FileUploadx";
import { addEmptyFolder, addFolder } from "@/API/Firestorex";
import { FetchEmptyFolder } from "@/hooks/FetchEmptyFolder";
import { useFetchSession } from "@/hooks/useFetchSession";
import { FetchIsVerifiedUser } from "@/hooks/FetchIsVerifiedUser";

export default function UploadX({ parentId }: FolderStructure) {
  const session = useFetchSession();
  const [isVisibleF, setVisibleF] = useState(false);
  const [isVisibleFol, setVisibleFol] = useState(false);
  const [isVisibleL, setVisibleL] = useState(false);
  const [isVerifiedUser, setisVerifiedUser] = useState(false);
  const [folderName, setfolderName] = useState("");
  const [Progress, setProgress] = useState(0);
  const empty_no = FetchEmptyFolder();
  let EmptyNo = 1;
  empty_no.empty_no_list.map((file: { empty_folder_no: number }) => {
    EmptyNo = file.empty_folder_no;
  });
  const uploadFolder = () => {
    if (folderName === "") {
      const Empty_folder = {
        EmptyNo: EmptyNo,
      };

      void addEmptyFolder(Empty_folder);
    }
    const folder = {
      folderName: folderName === "" ? `Folder-${EmptyNo}` : folderName,
      isFolder: true,
      folderList: [],
      parentId: parentId ?? "",
      UserEmail: session?.user?.email,
    };
    void addFolder(folder);
    setfolderName("");
    setVisibleFol(false);
  };
  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (session?.user?.name !== undefined && session?.user?.name !== null) {
      FileUpload(
        file,
        setProgress,
        setVisibleL,
        parentId,
        session?.user?.email,
        session?.user?.name,
      );
    }
  };
  const { userDetails } = FetchIsVerifiedUser(session?.user?.email);

  useEffect(() => {
    if (Array.isArray(userDetails) && userDetails.length > 0) {
      const firstUserDetail = userDetails[0] as { IsVerified?: boolean };
      if (firstUserDetail?.hasOwnProperty("IsVerified")) {
        setisVerifiedUser(!!firstUserDetail.IsVerified);
      }
    }
  }, [userDetails]);

  return (
    <div className={styles.main}>
      {isVerifiedUser ? (
        <>
          <Button
            onClick={() => {
              setVisibleF(!isVisibleF), setVisibleFol(false);
            }}
            btnClass="btn-outline btn-success mb-2 mt-2"
            title="Upload file"
          />
          {isVisibleF ? (
            <>
              <div className="relative inline-block">
                <input
                  onChange={(event) => uploadFile(event)}
                  type="file"
                  className="file-input mb-2 ml-2.5 mr-2.5 mt-2 w-full max-w-xs"
                />
                {isVisibleL ? (
                  <>
                    <div className={styles.loading}>
                      <svg
                        className={styles.spinner}
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line x1="12" y1="2" x2="12" y2="6"></line>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                        <line
                          x1="16.24"
                          y1="16.24"
                          x2="19.07"
                          y2="19.07"
                        ></line>
                        <line x1="2" y1="12" x2="6" y2="12"></line>
                        <line x1="18" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                      </svg>
                    </div>
                    <div className={styles.progressing}>{Progress}%</div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
          <Button
            onClick={() => {
              setVisibleF(false);
              setVisibleFol(!isVisibleFol);
            }}
            btnClass="btn-outline btn-info mb-2 mt-2"
            title="Create Folder"
          />
          {isVisibleFol ? (
            <div className="relative ml-2.5 inline-block">
              <input
                type="text"
                value={folderName}
                onChange={(event) => setfolderName(event.target.value)}
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
              />
              <button
                onClick={() => uploadFolder()}
                className={`${styles.uploadBtn} absolute`}
              >
                +
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
