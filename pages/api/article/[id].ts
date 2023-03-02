import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    const id = req.query.id as string || '';
        
    try {
        const article = await prisma?.article.findUniqueOrThrow({
            where: {
                id,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                },
                comments: {
                    include: {
                        author: true,
                    }
                },
            }
        });        
    
        res.status(200).json(article);
    } catch (err) {
        res.status(404).json({
            message: 'Article does not exist!'
        });
    }
}

export default handler;