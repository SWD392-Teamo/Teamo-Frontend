'use client'

import React, { ChangeEvent, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';

interface FilePickerProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  hasIcon?: boolean;
  placeholder?: string;
  showFileName?: boolean;
  noFileText?: string;
}

const FilePicker: React.FC<FilePickerProps> = ({
  onFileSelect,
  accept = '*',
  multiple = false,
  hasIcon = false,
  placeholder = 'Choose file',
  showFileName = true
}) => {
  const noFileText = 'No file chosen';
  const [fileName, setFileName] = useState<string>(noFileText);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFileName(selectedFile.name);
      onFileSelect(selectedFile);
    } else {
      setFileName(noFileText);
    }
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="relative flex items-center gap-3">
      <button
        onClick={handleClick}
        type="button"
        className="btn btn--primary btn--round"
      >
        {
            hasIcon 
            ? (<AiFillEdit size={20}/>) 
            : (<span>{placeholder}</span>)
        }
      </button>
      {showFileName && (
        <span className="text-sm text-gray-600">{fileName}</span>
      )}
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />
    </div>
  );
};

export default FilePicker;
