import { fetchWrapper } from "@/lib/fetchWrapper";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"; 

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      id: "dotnet-identity",
      name: "ASPNET Identity",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "email", type: "password" }
      },
      async authorize(credentials) {
        
        // If credentials are not provided, return null
        if (!credentials) {
          return null; 
        }

        // Add logic here to look up the user from the credentials supplied
        const response = await fetchWrapper.post('account/login', {
          email: credentials.email,
          password: credentials.password
        })

        if (response) {
          // Any object returned will be saved in `user` property of the JWT
          return response
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }
      }
    })
  ],
  callbacks: {
    // Populate session object with username
    // Handle the JWT callback
    async jwt({ token, user }) {
      if (user) {
        // Store the token and expiry time in the JWT
        token.accessToken = user.token;
        token.expires = new Date(Date.parse(user.expires)); // Store expiry as a timestamp
        token.email = user.email!;
        token.role = user.role;
        token.userId = user.userId;
      }

      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.expires = token.expires;
      }

      return session;
    }
  },
  pages: {
    // Specify the next app login page
    signIn: '/auth/login',  
  },
  secret: process.env.NEXTAUTH_SECRET
})