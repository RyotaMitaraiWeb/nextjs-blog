import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
    const body: { comment: string } = req.body;
    const articleId = req.query.id as string;
    const comment = body?.comment?.trim();
    console.log(articleId);
    
    const session = await getSession({ req });
    try {
        if (comment && session && articleId) {
            const user = session.user as User;
            await prisma?.comment.create({
                data: {
                    content: comment,
                    userId: user.id,
                    articleId,
                }
            });

            console.log('Successfully created comment');
            
            res.status(200).redirect('/article/' + articleId).end();
        } else {
            throw Error('Invalid submission');
        }
    } catch {
        res.status(400).redirect('/').end();
    }
}

export default handler;