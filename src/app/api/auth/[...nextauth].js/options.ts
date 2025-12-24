import { NextAuthOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
import { promises } from "dns";
import { email } from "zod";



export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
              id: "credentials",
              name: "credentials",

                credentials: {
                email: { label: "Email", type: "text " },
                password: { label: "Password", type: "password" },
    },

    async authorize(carentials:any):Promise<any>{

        await dbConnect();
        try{

            const user=await UserModel.findOne({
                $or:[
                    {email:carentials.identifier},
                    {username:carentials.identifier}
                ]
            })

            if (!user){
                throw new Error("No user found with the given email or username")
            }

            if (!user.isVerfied){
                throw new Error("please verfiy your account before logging in  ")
            }

            const isPasswordCorrect=await bcrypt.compare(carentials.password,user.password)

            if(isPasswordCorrect){
                return user
            }else{
             throw new Error("Incorrect password")
            }

          

        }catch(err:any){
            throw new Error(err)
        }
    }


        })

   
    ],


callbacks: {
   
    async jwt({ token, user }) {
      return token
    },
    async session({ session, user, token }) {
      return session
    }
 
},

     pages:{
        signIn: '/sign-in',
    },
    session:{
        strategy:'jwt',
    },
    secret:process.env.NEXTAUTH_SECRET,
}