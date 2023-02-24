import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    const id = req.query.id as string;
    
    const user = await prisma?.user.findUnique({
        where: {
            id,
        },
        include: {
            articles: {
                include: {
                    author: true,
                }
            },
        }
    });

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({});
    }
}

export default handler;