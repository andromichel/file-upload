// src/pages/auth/profile.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '../../components/FileUpload';
import { FileData, FileInsights } from '../../types/file';

const ProfilePage = () => {
  const router = useRouter();
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/auth/login');
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      // Fetch insights
      const insightsRes = await fetch('http://localhost:3001/uploads/insights', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!insightsRes.ok) throw new Error('Failed to fetch insights');
      const insightsData = await insightsRes.json();
      setInsights(insightsData);
      
      // Fetch files
      const filesRes = await fetch('http://localhost:3001/uploads?limit=10', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!filesRes.ok) throw new Error('Failed to fetch files');
      const filesData = await filesRes.json();
      setFiles(filesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (uploadedFiles: File[]) => {
    try {
      setLoading(true);
      setError('');
      
      const formData = new FormData();
      uploadedFiles.forEach(file => formData.append('files', file));

      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:3001/uploads', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'File upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        File Analytics Dashboard
      </h1>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '1rem'
        }}>
          Upload New Files
        </h2>
        <FileUpload onUpload={handleFileUpload} />
        {error && <p style={{ color: '#ef4444', marginTop: '0.5rem' }}>{error}</p>}
        {loading && <p style={{ color: '#3b82f6', marginTop: '0.5rem' }}>Processing...</p>}
      </div>

      
    </div>
  );
};

export default ProfilePage;