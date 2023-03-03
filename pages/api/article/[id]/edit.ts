import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { AuthorGuard } from "../../../../src/guards/AuthorGuard";
import { WriterGuard } from "../../../../src/guards/WriterGuard";
import { IArticleSubmission, role } from "../../../../types/types";

const handler: NextApiHandler = async (req, res) => {
    const article: IArticleSubmission = req.body;
    const title = article?.title?.trim();
    const content = article?.content?.trim();
    const id = req.query.id as string || '';

    const session = await getSession({ req });
    const user = session?.user as User;
    const role = user?.role || 'guest';
    const userId = user?.id || '';
    
    try {
        if (title && content) {
            await prisma?.user.update({
                where: { id: userId },
                data: {
                    articles: {
                        update: {
                            where: {
                                id,
                            },
                            data: {
                                content,
                                title,
                            }
                        }
                    }
                }
            })

            res.status(200).redirect(`/article/${id}`).end();
        } else {
            throw Error('Invalid submission');
        }
    } catch {
        res.status(400).redirect(`/article/${id}/edit`);
    }
}

export default handler;