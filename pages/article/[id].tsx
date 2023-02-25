import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Opening from "../../src/components/Article/Opening";
import Comments from "../../src/components/Comments/Comments";
import { IArticle } from "../../types/types";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Article({ article, user }: { article: IArticle, user: User | null }) {    
    return (
        <>
            <Opening article={article} />
            <Comments user={user} article={article} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id;
    const res = await fetch('http://localhost:3000/api/article/' + id);
    const article = await res.json();

    const session = await getServerSession(context.req, context.res, authOptions) || null;
    const user = session?.user || null;
    return {
        props: {
            article,
            user,
        }
    }
}