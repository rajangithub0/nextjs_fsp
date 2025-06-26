"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { on } from "events";
import { set } from "mongoose";

import { useRef, useState } from "react";
interface FileUploadProps { 
    onSuccess: (res: any) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video";
}



const FileUpload = ({onSuccess,onProgress,fileType}:FileUploadProps) => {
    const [uploading, setUploading] = useState(false); 
    const [error, setError] = useState<string |null>(null);

    //optional validation

    const validateFile = (file: File)=>{
        
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Plese upload a video file");
            }

        }
        if (file.size === 100 * 1024 * 1024) {
            setError("file size must be less then 100mb");
        }
        return true;
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { 
        const file = e.target.files?.[0];
        if(!file||!validateFile(file)){
            return;
        }   
        setUploading(true);
        setError(null);

        try {
            const authRes = await fetch("/api/auth/imagekit-auth")
            const auth = await authRes.json();


            const res = await upload({
                // Authentication parameters
                file,
                fileName: file.name,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                signature: auth.signature,
                expire: auth.expire,
                token: auth.token,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const precent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(precent));
                    }
                },
                
            });
            onSuccess(res);


        } catch (error) {
            console.error("upload error:", error);
            
        } finally {
            setUploading(false);
        }
    }
    

   

    return (
        <>
            
            <input type="file" accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileChange}
            />
            {uploading&&(<span>Loading .....</span>)}
        </>
    );
};

export default FileUpload;