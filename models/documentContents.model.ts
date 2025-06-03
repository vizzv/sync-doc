import mongoose, { Schema, Document } from 'mongoose';

export interface IDocumentContent extends Document {
  document_id: string; // UUID from Postgres
  content_json: any;
  version_number: number;
  created_at: Date;
  created_by: string; // UUID from Postgres
}

const DocumentContentSchema: Schema = new Schema({
  document_id: { type: String, required: true },
  content_json: { type: Schema.Types.Mixed, required: true },
  version_number: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  created_by: { type: String, required: true }
});

export default mongoose.models.DocumentContent ||
  mongoose.model<IDocumentContent>('DocumentContent', DocumentContentSchema);
