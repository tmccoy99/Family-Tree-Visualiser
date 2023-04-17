import mongoose, { Schema, model, Document } from 'mongoose';

interface IFamilyMember extends Document {
  name: string;
  birthYear: number;
  imageURL: string;
}

const FamilyMemberSchema = new Schema<IFamilyMember>({
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
  imageURL: { type: String, default: '../../assets/default_photo.png' },
});

export default model<IFamilyMember>('Family Member', FamilyMemberSchema);
