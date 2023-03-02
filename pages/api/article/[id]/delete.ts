import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { AdminGuard } from "../../../../src/guards/AdminGuard";
import { AuthorGuard } from "../../../../src/guards/AuthorGuard";

const handler: NextApiHandler = async (req, res) => {
    try {
        const id = req.query.id as string;

        const session = await getSession({ req });
        console.log(session);

        const user = session?.user as User;

        if (!user) {
            throw new Error('Invalid session');
        }

        console.log('yes');


        const role = user.role || 'guest';

        const article = await prisma?.article.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
            }
        });

        if (!article) {
            throw new Error('Article does not exist!');
        }

        if (AuthorGuard(user.id, article.author.id, role) || AdminGuard(role)) {
            await prisma?.article.delete({
                where: {
                    id,
                }
            });

            res.status(200).json([{}]);
        } else {
            throw Error('You cannot delete this article')
        }

    } catch {
        res.status(403).json([{}]);
    }
}

export default handler;