import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    const articles = await prisma?.article.findMany({
        select: {
            id: true,
            title: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            }
        }
    });

    res.status(200).json(articles);
}

export default handler;