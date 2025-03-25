// src/types/file.ts
export interface FileData {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  extractionMethod?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  metadata?: Record<string, any>;
}

export interface FileInsights {
  totalFiles: number;
  totalSize: number;
  fileTypes: { type: string; count: number }[];
  uploadsByDate: { date: string; count: number }[];
  largestFiles: FileData[];
  recentUploads: FileData[];
  statusDistribution: { status: string; count: number }[];
  errorRate?: number;
}