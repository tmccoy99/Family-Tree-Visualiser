import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  email: string;
  password: string;
  rootID?: mongoose.Types.ObjectId;
  validatePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rootID: { type: mongoose.Types.ObjectId, ref: 'Family Member' },
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

userSchema.method(
  'validatePassword',
  async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
);
const UserModel = model<IUser>('User', userSchema);

export { UserModel as default, IUser };
