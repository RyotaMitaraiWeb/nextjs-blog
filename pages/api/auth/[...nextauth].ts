import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';
import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth/core/types';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../prisma/prisma';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            const role = (user as User).role || 'guest';
            
            if (session.user) {
                const user = session.user as User;
                user.role = role;
            }

            return session;
        }
    }
}

export default NextAuth(authOptions);