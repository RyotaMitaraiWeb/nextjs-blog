import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader } from "@mui/material";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { AdminGuard } from "../../src/guards/AdminGuard";
import { AuthorGuard } from "../../src/guards/AuthorGuard";
import { WriterGuard } from "../../src/guards/WriterGuard";
import Link from "../../src/Link";
import { IArticleCard, role } from "../../types/types";
import { authOptions } from "../api/auth/[...nextauth]";
import styles from './article.module.scss';

export default function AllArticles({ articles, user }: { articles: IArticleCard[], user: User | null }) {
    const articleCards = articles.map(a => <ArticleCard user={user} article={a} key={a.id} />);
    return (
        <section>
            <h1 className={styles.heading}>All articles</h1>
            {articleCards}
        </section>
    );
}

export function ArticleCard({ article, user }: { article: IArticleCard, user: User | null }) {
    const date = new Date(article.createdAt);
    const shortDate = date.toLocaleDateString('en', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <Card component="article" className={styles.card} variant="outlined" sx={{ borderColor: 'primary.main' }}>
            <CardHeader
                avatar={
                    <Avatar src={article.author.image} />
                }
                title={article.author.name}
                subheader={shortDate}
                titleTypographyProps={{
                    fontWeight: 'bold'
                }}
                subheaderTypographyProps={{
                    fontWeight: 'bold'
                }}
            />
            <CardContent>
                <h2>{article.title}</h2>
            </CardContent>
            <CardActions className={styles.actions}>
                <Button
                    variant="contained"
                    LinkComponent={Link}
                    href={`/article/${article.id}`}
                >
                    Read
                </Button>
                <WriterButtons user={user} article={article} />
            </CardActions>
        </Card>
    )
}

function WriterButtons({ article, user }: { article: IArticleCard, user: User | null }) {
    const role = user?.role || 'guest';
    if (AdminGuard(role) || AuthorGuard(user?.id, article.author.id, role)) {
        return (
            <>
                <Button
                    color="secondary"
                    variant="contained"
                    LinkComponent={Link}
                    href={`/article/${article.id}/edit`}
                    sx={{
                        display: 'flex',
                        gap: '8px',
                        marginLeft: '0'
                    }}
                >
                    <EditIcon />
                    Edit
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    LinkComponent={Link}
                    href={`/article/${article.id}/delete`}
                    sx={{
                        display: 'flex',
                        gap: '8px',
                        marginLeft: '0'
                    }}
                >
                    <DeleteIcon />
                    Delete
                </Button>
            </>
        )
    }

    return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch('http://localhost:3000/api/article/all');
    const articles = await res.json();

    const session = await getServerSession(context.req, context.res, authOptions);
    const user = session?.user || null;

    return {
        props: {
            articles,
            user,
        }
    }
}