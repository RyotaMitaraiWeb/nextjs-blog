import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { SuperAdminGuard } from "../../../../src/guards/SuperAdminGuard";

const validRoles = ['user', 'admin', 'writer'];

const handler: NextApiHandler = async (req, res) => {
    const body = req.body;
    const role = body.role;
    const id = req.query.id as string;
    const session = await getSession({ req });

    if (!role) {
        res.status(400).redirect('/');
    } else if (!session) {
        res.status(401).redirect('/');
    } else {
        const user = session.user as User;
        if (!SuperAdminGuard(user.role || 'guest')) {
            res.status(403).redirect('/');
        } else {
            try {
                const user = await prisma?.user.update({
                    where: {
                        id,
                    },
                    data: {
                        role,
                    }
                });

                if (!user) {
                    throw Error('User does not exist');
                }

                res.status(200).redirect('/profile/' + id);
            } catch {
                res.status(404).redirect('/');
            }
        }
    }
};

export default handler;