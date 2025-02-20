"use client";

import { deleteProjectRequest, getProjectRequest, putProjectRequest } from "@/apis";
import { ResponseDto } from "@/apis/response";
import { DeleteProjectResponseDto, GetProjectResponseDto, PutProjectResponseDto } from "@/apis/response/project";
import styles from "./page.module.css";
import { ResourceListItem } from "@/types/interface";
import { convertUrlToFile } from "@/utils";
import gsap from "gsap";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CiCirclePlus, CiCircleRemove } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

export default function ProjectUpdatePage() {
  const { id } = useParams<{ id: string }>();

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const hiddenContentRef = useRef<HTMLTextAreaElement>(null);

  const [apiKey, setApiKey] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [themeColor, setThemeColor] = useState<string>("#3E444D");

  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [thumbnailPreview, setThumbnailPreview] = useState<string>();

  const [content, setContent] = useState<string>("");

  const [resourceFiles, setResourceFiles] = useState<File[]>([]);
  const [resourcePreviews, setResourcePreviews] = useState<ResourceListItem[]>([]);

  const router = useRouter();

  const onUpdateButtonMouseEnterHandler = () => {
    gsap.to("#preview-thumbnail-wrapper", { translateY: "1%", scaleY: 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-thumbnail", { scaleX: 1.1, scaleY: 1.1 / 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-update-button", { backgroundColor: "#ffffffff", scale: 1.03, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-update-button-text", { color: "#1a1a1a", duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-update-button-icon", { top: "-1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to("#preview-update-button-icon-second", { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
  };

  const onUpdateButtonMouseLeaveHandler = () => {
    gsap.to("#preview-thumbnail-wrapper", { translateY: 0, scaleY: 1, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-thumbnail", { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-update-button", { backgroundColor: "#00000000", scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-update-button-text", { color: "#ffffff", duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-update-button-icon", { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to("#preview-update-button-icon-second", { top: "1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
  };

  const onDeleteButtonMouseEnterHandler = () => {
    gsap.to("#preview-thumbnail-wrapper", { translateY: "1%", scaleY: 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-thumbnail", { scaleX: 1.1, scaleY: 1.1 / 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-delete-button", { backgroundColor: "#ffffffff", scale: 1.03, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-delete-button-text", { color: "#1a1a1a", duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-delete-button-icon", { top: "-1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to("#preview-delete-button-icon-second", { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
  };

  const onDeleteButtonMouseLeaveHandler = () => {
    gsap.to("#preview-thumbnail-wrapper", { translateY: 0, scaleY: 1, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-thumbnail", { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-delete-button", { backgroundColor: "#00000000", scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-delete-button-text", { color: "#ffffff", duration: 0.5, ease: "power2.out" });
    gsap.to("#preview-delete-button-icon", { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to("#preview-delete-button-icon-second", { top: "1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
  };

  const onApiKeyChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onDescriptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onThemeColorChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setThemeColor(event.target.value);
  };

  const onThumbnailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(event.target.files[0]);
    setThumbnailFile(event.target.files[0]);
  };

  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onResourcesChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    for (const file of event.target.files) {
      setResourceFiles((prev) => [...prev, file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setResourcePreviews((prev) => [...prev, { fileName: file.name, url: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRemoveThumbnailButtonClickHandler = () => {
    setThumbnailPreview(undefined);
    setThumbnailFile(undefined);
  };

  const onRemoveResourceButtonClickHandler = (index: number) => {
    const newResourceFiles = [...resourceFiles];
    const newResourcePreviews = [...resourcePreviews];
    newResourceFiles.splice(index, 1);
    newResourcePreviews.splice(index, 1);
    setResourceFiles(newResourceFiles);
    setResourcePreviews(newResourcePreviews);
  };

  const putProjectResponse = (responseBody: PutProjectResponseDto | ResponseDto | null) => {
    if (!responseBody) return false;
    const { code } = responseBody;
    if (code === "AF") alert("인증 실패");
    if (code === "VF") alert("유효성 검사 에러");
    if (code === "NEP") alert("존재하지 않는 프로젝트");
    if (code === "EF") alert("비어있는 파일");
    if (code === "FSE") alert("파일 저장 에러");
    if (code === "DBE") alert("데이터베이스 에러");
    if (code !== "SU") return;

    alert("프로젝트를 성공적으로 수정하였습니다.");
    router.push(`/project/detail/${id}`);
  };

  const deleteProjectResponse = (responseBody: DeleteProjectResponseDto | ResponseDto | null) => {
    if (!responseBody) return false;
    const { code } = responseBody;
    if (code === "AF") alert("인증 실패");
    if (code === "NEP") alert("존재하지 않는 프로젝트");
    if (code === "DBE") alert("데이터베이스 에러");
    if (code !== "SU") return;

    alert("프로젝트를 성공적으로 삭제하였습니다.");
    router.push(`/`);
  };

  const onUpdateButtonClickHandler = () => {
    const data: FormData = new FormData();
    data.append("name", name);
    data.append("themeColor", themeColor);
    data.append("description", description);
    data.append("content", content);
    if (thumbnailFile) data.append("thumbnailFile", thumbnailFile);
    for (const resourceFile of resourceFiles) {
      data.append("resourceFiles", resourceFile);
    }

    putProjectRequest(id, data, apiKey).then(putProjectResponse);
  };

  const onDeleteButtonClickHandler = () => {
    deleteProjectRequest(id, apiKey).then(deleteProjectResponse);
  };

  const getProjectResponse = (responseBody: GetProjectResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "NEP") alert("존재하지 않는 게시물");
    if (code === "DBE") alert("데이터베이스 에러");
    if (code !== "SU") {
      router.push(`/`);
      return;
    }

    const { name, thumbnail, themeColor, description, content, resourceList } = responseBody as GetProjectResponseDto;
    setName(name);
    setThemeColor(themeColor);
    setDescription(description);
    setContent(content);
    if (thumbnail) {
      setThumbnailPreview(thumbnail);
      convertUrlToFile(thumbnail).then((thumbnailFile) => setThumbnailFile(thumbnailFile));
    }
    resourceList.map((resource) => {
      convertUrlToFile(resource.url).then((resourceFile) => {
        setResourcePreviews((prev) => [...prev, resource]);
        setResourceFiles((prev) => [...prev, resourceFile]);
      });
    });
  };

  useEffect(() => {
    getProjectRequest(id).then(getProjectResponse);
  }, [id]);

  useEffect(() => {
    if (!contentRef.current || !hiddenContentRef.current) return;
    hiddenContentRef.current.style.marginTop = `-${hiddenContentRef.current.offsetHeight}px`;
    contentRef.current.style.height = `${hiddenContentRef.current.scrollHeight}px`;
  }, [content]);

  return (
    <div className={styles["container"]}>
      <h1 className={styles["header"]}>project update</h1>
      <div className={styles["main"]}>
        <div className={styles["main-top"]}>
          <div className={styles["main-top-left"]}>
            <label className={styles["main-top-left-label"]} htmlFor="api-key-input">
              api key
            </label>
            <input id="api-key-input" type="password" value={apiKey} onChange={onApiKeyChangeHandler} />
            <label className={styles["main-top-left-label"]} htmlFor="id-input">
              id
            </label>
            <input id="id-input" type="text" value={id} disabled />
            <label className={styles["main-top-left-label"]} htmlFor="name-input">
              name
            </label>
            <input id="name-input" type="text" value={name} onChange={onNameChangeHandler} />
            <label className={styles["main-top-left-label"]} htmlFor="description-input">
              description
            </label>
            <input id="description-input" type="text" value={description} onChange={onDescriptionChangeHandler} />
            <div className={styles["theme-color-input-container"]}>
              <label className={styles["main-top-left-label-theme-color"]} htmlFor="theme-color-input">
                theme color
              </label>
              <input id="theme-color-input" type="color" value={themeColor} onChange={onThemeColorChangeHandler} />
            </div>
          </div>
          <div className={styles["main-top-right"]}>
            <h3>preview / update</h3>
            <div className={styles["preview-container"]} style={{ background: themeColor }}>
              <div className={styles["preview-info-box"]}>
                <div className={styles["preview-thumbnail-wrapper"]} id="preview-thumbnail-wrapper">
                  <label htmlFor="thumbnail-input" className={styles["preview-thumbnail-label"]}>
                    <Image
                      src={`${thumbnailPreview ? thumbnailPreview : "/resources/default-thumbnail.png"}`}
                      alt="preview"
                      width={1600}
                      height={1200}
                      className={styles["preview-thumbnail"]}
                      id="preview-thumbnail"
                    />
                  </label>
                  {thumbnailFile && (
                    <div className={styles["preview-thumbnail-remove-icon"]} onClick={onRemoveThumbnailButtonClickHandler}>
                      <CiCircleRemove />
                    </div>
                  )}
                  <input id="thumbnail-input" type="file" accept="image/*" style={{ display: "none" }} onChange={onThumbnailChangeHandler} />
                </div>
                <div className={styles["preview-info"]}>
                  <input value={name} className={styles["preview-name"]} onChange={onNameChangeHandler} />
                  <input value={description} className={styles["preview-description"]} onChange={onDescriptionChangeHandler} />
                </div>
              </div>
              <div className={styles["preview-button-container"]}>
                <button
                  className={styles["preview-button"]}
                  id="preview-update-button"
                  onClick={onUpdateButtonClickHandler}
                  onMouseEnter={onUpdateButtonMouseEnterHandler}
                  onTouchStart={onUpdateButtonMouseEnterHandler}
                  onMouseLeave={onUpdateButtonMouseLeaveHandler}
                  onTouchEnd={onUpdateButtonMouseLeaveHandler}
                >
                  <p className={styles["preview-button-text"]} id="preview-update-button-text">
                    upate project
                  </p>
                  <div className={styles["preview-button-icon-wrapper"]}>
                    <GoArrowUpRight className={styles["preview-button-icon"]} id="preview-update-button-icon" />
                    <GoArrowUpRight className={styles["preview-button-icon-second"]} id="preview-update-button-icon-second" />
                  </div>
                </button>
                <button
                  className={styles["preview-button"]}
                  id="preview-delete-button"
                  onClick={onDeleteButtonClickHandler}
                  onMouseEnter={onDeleteButtonMouseEnterHandler}
                  onTouchStart={onDeleteButtonMouseEnterHandler}
                  onMouseLeave={onDeleteButtonMouseLeaveHandler}
                  onTouchEnd={onDeleteButtonMouseLeaveHandler}
                >
                  <p className={styles["preview-button-text"]} id="preview-delete-button-text">
                    delete project
                  </p>
                  <div className={styles["preview-button-icon-wrapper"]}>
                    <GoArrowUpRight className={styles["preview-button-icon"]} id="preview-delete-button-icon" />
                    <GoArrowUpRight className={styles["preview-button-icon-second"]} id="preview-delete-button-icon-second" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className={styles["hr"]} />
        <div className={styles["main-bottom"]}>
          <div className={styles["main-bottom-left"]}>
            <label className={styles["main-bottom-left-label"]} htmlFor="content-textarea">
              content
            </label>
            <textarea ref={contentRef} id="content-textarea" rows={20} value={content} onChange={onContentChangeHandler} />
            <textarea ref={hiddenContentRef} rows={20} value={content} onChange={onContentChangeHandler} style={{ visibility: "hidden" }} />
          </div>
          <div className={styles["main-bottom-right"]}>
            <div className={styles["main-bottom-right-header"]}>
              <h3>resources</h3>
              <label htmlFor="resources-input" className={styles["main-bottom-right-header-icon"]}>
                <CiCirclePlus />
              </label>
              <input id="resources-input" type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onResourcesChangeHandler} />
            </div>
            {resourcePreviews.map((preview, index) => (
              <div key={index}>
                <img src={preview.url} alt={preview.fileName} className={styles["resource-preview-image"]} />
                <div className={styles["resource-preview-description-container"]}>
                  <div className={styles["resource-preview-remove-icon"]} onClick={() => onRemoveResourceButtonClickHandler(index)}>
                    <CiCircleRemove />
                  </div>
                  <p className={styles["resource-preview-file-name"]}>{preview.fileName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
