"use client"

import React, { useState, ChangeEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FileUploaderProps {
  onFilesUpload: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [labelText, setLabelText] = useState<string>('Select a File');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      setSelectedFiles(files);

      // Update label text with the names of selected files
      const fileNames = files.map(file => file.name).join(', ');
      setLabelText(fileNames || 'Select a File');
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      const files: File[] = Array.from(e.dataTransfer.items)
        .filter(item => item.kind === 'file')
        .map(item => item.getAsFile() as File);

      setSelectedFiles(files);

      // Update label text with the names of selected files
      const fileNames = files.map(file => file.name).join(', ');
      setLabelText(fileNames || 'Select a File');
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onFilesUpload(selectedFiles);
      setSelectedFiles([]);
      setLabelText('Select a File');
    }
  };

  const preventDefault = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
    >
      {/* <label id="file-input-label" htmlFor="file-input">
        {labelText}
      </label> */}
      <Input type="file" id="file-input" onChange={handleFileChange} multiple />
      <Button className='mt-2' onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default FileUploader;
