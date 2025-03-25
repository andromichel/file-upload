import { Model } from 'mongoose';
import { File } from '../uploads/file.schema';
export declare class InsightsService {
    private fileModel;
    constructor(fileModel: Model<File>);
    getUserInsights(userId: string): Promise<{
        totalFiles: number;
        totalSize: any;
        fileTypes: {
            type: any;
            count: any;
        }[];
        statusDistribution: {
            status: any;
            count: any;
        }[];
        recentUploads: {
            id: import("mongoose").FlattenMaps<unknown>;
            name: string;
            type: string;
            size: number;
            status: string;
            uploadedAt: Date;
        }[];
    }>;
}
