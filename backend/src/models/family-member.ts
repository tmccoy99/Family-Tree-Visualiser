import mongoose, { Schema, model, Document } from 'mongoose';

interface IFamilyMember extends Document {
  name: string;
  birthYear: number;
  imageURL: string;
  deathYear?: number;
  children: (mongoose.Types.ObjectId | IFamilyMember)[];
  spouse?: mongoose.Types.ObjectId | IFamilyMember;
}

const FamilyMemberSchema = new Schema<IFamilyMember>({
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
  imageURL: { type: String, default: '../../assets/default-profile-photo.png' },
  deathYear: Number,
  children: [{ type: mongoose.Types.ObjectId, ref: 'Family Member' }],
  spouse: { type: mongoose.Types.ObjectId, ref: 'Family Member' },
});

const FamilyMember = model<IFamilyMember>('Family Member', FamilyMemberSchema);
export { FamilyMember as default, IFamilyMember };
