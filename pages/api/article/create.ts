import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { WriterGuard } from "../../../src/guards/WriterGuard";
import { IArticleSubmission, role } from "../../../types/types";

const handler: NextApiHandler = async (req, res) => {
    const article: IArticleSubmission = req.body;
    const title = article?.title?.trim();
    const content = article?.content?.trim();

    const session = await getSession({ req });
    const user = session?.user as User;
    const role = user?.role || 'guest';
    
    try {
        if (title && content && WriterGuard(role)) {
            const article = await prisma?.article.create({
                data: {
                    title,
                    content,
                    userId: user.id,
                }
            });

            res.status(200).redirect(`/article/${article?.id}`).end();
        } else {
            throw Error('Invalid submission');
        }
    } catch {
        res.status(400).redirect('/article/create');
    }
}

export default handler;