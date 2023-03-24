import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
