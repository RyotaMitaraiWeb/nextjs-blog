import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { IArticle } from '../types/types';
import { ArticleCard } from './article/all';
import { User } from '@prisma/client';

export default function Home({ articles }: { articles: IArticle[] }) {
    const { data } = useSession();
    const user = data?.user as User | null;
    const newestArticles = articles.map(a => <ArticleCard key={a.id} article={a} user={user} />);

    return (
        <section>
            <h1 style={{ textAlign: 'center' }}>Home</h1>
            <h2 style={{ textAlign: 'center' }}>Newest articles</h2>
            {newestArticles}
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('http://localhost:3000/api/article/newest');
    const articles = await res.json();

    return {
        props: {
            articles,
        }
    }
}