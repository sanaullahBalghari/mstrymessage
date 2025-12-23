import mongoose ,{Schema, Document} from 'mongoose';
import { Message } from "./Message";


export interface Message extends Document{
    content:string;
    createdAt:Date
}

const MessageSchema:Schema<Message>=new Schema({

    content:{
        type:String,
        requried:true
    },
    createdAt:{
        type:Date,
        requried:true,
        default:Date.now 
    }
})


export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerfied:boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    verifyCode: {
      type: String,
      required:[true, "verifycode is required"],
    },

    verifyCodeExpiry: {
      type: Date,
      required:[true, "verifycode is EXPIRY is required"],
    },

    isVerfied:{
      type: Boolean,
      default:false,
    },
    isAcceptingMessage: {
      type: Boolean,
      default: true,
    },

    messages: [MessageSchema],


});

const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);


export default UserModel;