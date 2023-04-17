import mongoose, { Schema, model, Document, mongo } from 'mongoose';

interface IFamilyMember extends Document {
  name: string;
  birthYear: number;
  imageURL: string;
  deathYear?: number;
  children: mongoose.Types.ObjectId[];
  spouse?: mongoose.Types.ObjectId | IFamilyMember;
}

const FamilyMemberSchema = new Schema<IFamilyMember>({
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
  imageURL: { type: String, default: '../../assets/default_photo.png' },
  deathYear: Number,
  children: [{ type: mongoose.Types.ObjectId, ref: 'Family Member' }],
  spouse: { type: mongoose.Types.ObjectId, ref: 'Family Member' },
});

const FamilyMember = model<IFamilyMember>('Family Member', FamilyMemberSchema);
export { FamilyMember as default, IFamilyMember };
