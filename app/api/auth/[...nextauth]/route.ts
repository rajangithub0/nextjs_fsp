import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// This file handles the NextAuth.js authentication routes for both GET and POST requests.