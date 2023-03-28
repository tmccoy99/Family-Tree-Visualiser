import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre(
  'save',
  async function (next: (error?: any) => void): Promise<void> {
    try {
      if (this.isModified('password') || this.isNew) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);
const UserModel = model<IUser>('User', userSchema);

export { UserModel as default, IUser };
