import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import ProfileTabs from "../../src/components/Profile/ProfileTabs";
import { IUser } from "../../types/types";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Profile({ user, session }: { user: IUser, session: User | null }) {    
    return (
        <section>
            <ProfileTabs session={session} user={user} />
        </section>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id || '';
    const res = await fetch('http://localhost:3000/api/profile/' + id);
    const user = await res.json();

    if (!user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const session = await getServerSession(context.req, context.res, authOptions);

    return {
        props: {
            user,
            session: session?.user,
        }
    }
}