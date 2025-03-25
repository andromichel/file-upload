// src/components/InsightsDashboard.tsx
import React from 'react';
import { FileInsights } from '../types/file';

interface InsightsDashboardProps {
  insights: FileInsights;
}

const InsightsDashboard: React.FC<InsightsDashboardProps> = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Summary Cards */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800">Total Files</h3>
        <p className="text-2xl font-bold">{insights.totalFiles}</p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-green-800">Total Size</h3>
        <p className="text-2xl font-bold">{(insights.totalSize / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
      
      {insights.errorRate !== undefined && (
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-red-800">Error Rate</h3>
          <p className="text-2xl font-bold">{insights.errorRate}%</p>
        </div>
      )}

      {/* File Types Chart */}
      <div className="md:col-span-2 lg:col-span-3 bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-2">File Type Distribution</h3>
        <div className="flex flex-wrap gap-2">
          {insights.fileTypes.map((type) => (
            <div key={type.type} className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 mr-2"></div>
              <span className="text-sm">
                {type.type}: {type.count} ({Math.round((type.count / insights.totalFiles) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Distribution */}
      <div className="md:col-span-2 lg:col-span-3 bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-2">Status Distribution</h3>
        <div className="flex flex-wrap gap-2">
          {insights.statusDistribution.map((status) => (
            <div key={status.status} className="flex items-center">
              <div className={`w-4 h-4 mr-2 ${
                status.status === 'completed' ? 'bg-green-500' :
                status.status === 'processing' ? 'bg-blue-500' :
                status.status === 'failed' ? 'bg-red-500' :
                'bg-yellow-500'
              }`}></div>
              <span className="text-sm">
                {status.status}: {status.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsDashboard;