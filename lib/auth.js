import { mongooseConnect } from "./mongoose";
import Admin from "../models/admin";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        
        const { email, password } = credentials;

        // //console.log(email,password);

        // //console.log("credentials are",credentials);
        try {
          await mongooseConnect();
          const user = await Admin.findOne({ email });
          // //console.log("finding : ", user);
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcryptjs.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          ////console.log("Error:", error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await connect();
          const ifUserExists = await Admin.findOne({ email });
          if (ifUserExists) {
            ////console.log("ifUserExists", ifUserExists);
            return user;
          }
          const newUser = new User({
            name: name,
            email: email,
          });
          const res = await newUser.save();
          if (res.status === 200 || res.status === 201) {
            ////console.log(res);
            return user;
          }
        } catch (err) {
          ////console.log(err);
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        ////console.log("the users data is ", user);

        const { _id, name, email, password, __v, fname, lname, number, timestamp, image } = user;
        token.id = _id;
        token.name = name;
        token.email = email;
        token.image = image;
        token.fname = fname;
        token.lname = lname;
        token.number = number;
        token.created = timestamp;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.fname = token.fname;
        session.user.lname = token.lname;
        session.user.image = token.image;
        session.user.number = token.number;
        session.user.created = token.created;
      }
      ////console.log("for session", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
