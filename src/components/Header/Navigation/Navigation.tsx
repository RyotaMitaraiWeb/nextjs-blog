import { Button } from "@mui/material";
import { User } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { WriterGuard } from "../../../guards/WriterGuard";
import Link from "../../../Link";
import styles from './Navigation.module.scss';

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Button href="/" variant="text" LinkComponent={Link}>Home</Button>
                </li>
                <li>
                    <Button href="/article/all" variant="text" LinkComponent={Link}>All</Button>
                </li>
                <WriterLink />
                <AuthLinks />
            </ul>
        </nav>
    );
}

function AuthLinks() {
    const { data: session } = useSession();
    const user = session?.user as User | null;

    if (!user) {
        return <li><Button variant="text" className={styles.signButton} onClick={() => signIn('google')}>Sign in</Button></li>;
    }

    return (
        <>
            <li><Button variant="text" href="/profile" LinkComponent={Link}>Profile</Button></li>
            <li><Button variant="text" className={styles.signButton} onClick={() => signOut({ redirect: false })}>Sign out</Button></li>
        </>
    )
}

function WriterLink() {
    const { data: session } = useSession();
    const user = session?.user as User | null;

    if (!user) {
        return null;
    }

    const role = user.role || 'guest';

    if (!WriterGuard(role)) {
        return null;
    }

    return (
        <li>
            <Button
                variant="text"
                LinkComponent={Link}
                href="/article/create"
            >
                New article
            </Button>
        </li>
    )
}