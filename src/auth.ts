import { eq } from "drizzle-orm";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db/db";
import { User } from "./db/schema";
import bcrypt from 'bcryptjs';
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Joe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password)
          throw new CredentialsSignin("Invalid credentials");

        const userInfo = await db
          .select({
            id: User.id,
            name: User.name,
            email: User.email,
            password: User.password,
          })
          .from(User)
          .where(eq(User.email, email as string));

        const user = userInfo[0];

        if (!user) throw new CredentialsSignin("Invalid credentials");

        const isMatch = await bcrypt.compare(password as string, user.password as string);
       
        if (!isMatch) throw new CredentialsSignin("Invalid credentials");
        return { ...user, id: String(user.id) };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: { 
  },
  secret: process.env.NEXTAUTH_SECRET,
});
