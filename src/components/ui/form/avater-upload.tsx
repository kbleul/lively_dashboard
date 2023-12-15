"use client";
import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import cn from "@/utils/class-names";
import UploadIcon from "@/components/shape/upload";
import { Text } from "@/components/ui/text";
import Image from "next/image";
export interface Accept {
  [key: string]: string[];
}

interface AvatarPickerProps {
  name: string;
  label: string;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ name, label }) => {
  const { setFieldValue } = useFormikContext();
  const [meta] = useField(name);
  const { value } = meta;
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      setFieldValue(name, file);
    },
    [name, setFieldValue]
  );

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFieldValue(name, file);
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    maxSize: 3 * 1024 * 1024, // 30 MB
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"], // Add webp file format
      // Add more file types if needed
    },
    onDropRejected() {
      alert("In valid file format");
    },
  };

  return (
    <div className="w-full">
      <label
        className="      block 
            text-xs
            font-medium 
            leading-6 
            text-gray-900
            capitalize
            dark:text-light-gray"
      >
        {label}
      </label>

      <Dropzone {...dropzoneOptions}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <section className="w-full flex flex-col items-start space-y-2">
            <div
              {...getRootProps()}
              onClick={handleClick}
              className={`border ${
                isDragActive
                  ? " relative grid h-40 w-40 place-content-center rounded-full border"
                  : isDragReject
                    ? "border-red-500"
                    : "bg-zinc-100"
              } border-dashed 
              rounded-md cursor-pointer w-full p-8 flex 
              items-center space-x-3 justify-center bg-zinc-100 `}
            >
              <input
                {...getInputProps()}
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="flex flex-col items-center justify-center">
                <UploadIcon className="mx-auto h-12 w-12" />
                <Text className="font-medium">Drop or select file</Text>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {value && (
        <div className="pt-2">
          <Image
            src={URL.createObjectURL(value)}
            alt="Image"
            className="h-20 w-full object-contain"
            width={100}
            height={100}
          />
        </div>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className={"text-xs text-red-500 capitalize"}
      />
    </div>
  );
};

export default AvatarPicker;
