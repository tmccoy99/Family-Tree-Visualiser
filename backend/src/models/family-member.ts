import mongoose, { Schema, model, Document } from 'mongoose';

interface IFamilyMember extends Document {
  name: string;
  birthYear: number;
}

const FamilyMemberSchema = new Schema<IFamilyMember>({
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
});

export default model<IFamilyMember>('Family Member', FamilyMemberSchema);
