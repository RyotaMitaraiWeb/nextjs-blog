import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
    const { data, status } = useSession();
    let logged = 'guest';
    if (status === 'authenticated') {
        logged = data.user?.name || '';
    }

    console.log(data);

    return (
        <main>
            <h1>Home</h1>
            <p>Hi, {logged}</p>
            <button onClick={() => signIn('google')}>Sign in</button>
            { data ? <button onClick={() => signOut()}>Sign out</button> : null}
        </main>
    );
}
