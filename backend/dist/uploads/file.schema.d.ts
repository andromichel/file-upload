import { Document } from 'mongoose';
export declare class File extends Document {
    name: string;
    type: string;
    size: number;
    userId: string;
    status: string;
    extractionMethod?: string;
    metadata?: Record<string, any>;
    path: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const FileSchema: import("mongoose").Schema<File, import("mongoose").Model<File, any, any, any, Document<unknown, any, File> & File & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, File, Document<unknown, {}, import("mongoose").FlatRecord<File>> & import("mongoose").FlatRecord<File> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export interface FileDocument extends File, Document {
    createdAt: Date;
    updatedAt: Date;
}
