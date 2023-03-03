import { NextApiHandler } from "next";

const handler: NextApiHandler = async (_req, res) => {
    const articles = await prisma?.article.findMany({
        take: 3,
        include: {
            author: {
                select: {
                    name: true,
                    id: true,
                    image: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
        }
    });

    res.status(200).json(articles);
}

export default handler;