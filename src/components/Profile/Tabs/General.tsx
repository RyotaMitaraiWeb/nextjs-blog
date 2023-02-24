import { Avatar } from "@mui/material";
import { User } from "@prisma/client";
import styles from '../profile.module.scss';
import PromoteMenu from "./Promote";

export default function GeneralInfo({ user, session }: { user: User, session: User | null }) {
    const roleFormattings = new Map<string, string>();
    roleFormattings.set('user', 'User');
    roleFormattings.set('writer', 'Writer');
    roleFormattings.set('admin', 'Administrator');
    roleFormattings.set('superadmin', 'Super Administrator');
    
    const role = user?.role || 'user';

    return (
        <section className={styles.general}>
            <Avatar
                src={user.image || ''}
                alt=""
                sx={{ width: 128, height: 128 }}
            />
            <div className="info">
                <h1>{user.name}</h1>
                <h2>{roleFormattings.get(role)}</h2>
                <PromoteMenu session={session} user={user} />
            </div>
        </section>
    );
}