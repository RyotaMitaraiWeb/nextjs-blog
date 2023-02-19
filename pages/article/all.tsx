import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "../../src/Link";
import { IArticleCard } from "../../types/types";
import styles from './article.module.scss';

export default function AllArticles({ articles }: { articles: IArticleCard[] }) {
    const articleCards = articles.map(a => <ArticleCard article={a} key={a.id} />);
    return (
        <section>
            <h1 className={styles.heading}>All articles</h1>
            {articleCards}
        </section>
    );
}

function ArticleCard({ article }: { article: IArticleCard }) {
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
            <CardActions sx={{paddingBottom: 2}}>
                <Button
                    variant="contained"
                    LinkComponent={Link}
                    href={`/article/${article.id}`}
                >
                    Read
                </Button>
            </CardActions>
        </Card>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('http://localhost:3000/api/article/all');
    const articles = await res.json();
    return {
        props: {
            articles
        }
    }
}