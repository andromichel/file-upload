// src/components/FileUpload.tsx
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
}

const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: true
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(selectedFiles)]);
    }
  };

  const handleUpload = () => {
    if (files.length > 0) {
      onUpload(files);
      setFiles([]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Drag and Drop Zone */}
      <div 
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? '#3b82f6' : '#d1d5db'}`,
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease',
          backgroundColor: isDragActive ? '#f0f7ff' : 'transparent'
        }}
      >
        <input {...getInputProps()} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <p style={{ color: '#3b82f6', fontWeight: '500' }}>
            {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to select'}
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Supported formats: PDF, DOCX, XLSX, PPTX, TXT
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1rem'
        }}>
          <h3 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Selected Files</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {files.map((file, index) => (
              <li key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <span style={{ fontSize: '0.875rem' }}>{file.name}</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Traditional File Input */}
      <div className="flex items-center justify-center">
        <label className="flex flex-col items-center px-4 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
          <span className="text-sm font-medium text-gray-700">Browse Files</span>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            multiple
            accept="image/*,.pdf,.txt,.doc,.docx"
          />
        </label>
      </div>

      {/* Selected Files Preview */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Selected files:</h4>
          <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors duration-150">
                <button 
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 p-1 transition-colors duration-150"
                  aria-label="Remove file"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={files.length === 0}
          >
            Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
          </button>
        </div>
      )}

      {/* Supported Formats Info */}
      <div className="text-center text-xs text-gray-400 mt-2">
        Supported formats: JPG, PNG, GIF, PDF, TXT, DOC, DOCX
      </div>
    </div>
  );
};

// Helper component for file icons (unchanged)
const FileIcon = ({ extension }: { extension?: string }) => {
  const iconClass = "w-6 h-6";
  
  
};

export default FileUpload;