import { InsightsService } from './insights.service';
export declare class InsightsController {
    private readonly insightsService;
    constructor(insightsService: InsightsService);
    getInsights(userId: string): Promise<{
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
