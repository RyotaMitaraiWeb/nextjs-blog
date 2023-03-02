import { Avatar } from "@mui/material";
import { User } from "@prisma/client";
import { WriterButtons } from "../../../pages/article/all";
import { IArticle } from "../../../types/types";
import Link from "../../Link";
import styles from './article.module.scss';

export default function Opening({ article, user }: { article: IArticle, user: User | null }) {
    const paragraphs = article.content
        .split(/^\n+/gmi)
        .filter(p => p !== '\r')
        .map((paragraph, index) => <p key={index}>{paragraph}</p>);

    return (
        <section className={styles.article}>
            <h1>{article.title}</h1>
            <div className={styles.actions}>
                <WriterButtons article={article} user={user} />
            </div>
            <Author article={article} />
            {paragraphs}
        </section>
    )
}

function Author({ article }: { article: IArticle }) {
    const date = new Date(article.createdAt);
    const shortDate = date.toLocaleDateString('en', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className={styles.author}>
            <Avatar
                src={article.author.image}
                alt=""
                sx={{ width: 48, height: 48 }}
            />
            <div className={styles.info}>
                <span className={styles.name}>
                    <Link href={`/profile/${article.author.id}`}>{article.author.name}</Link>
                </span>

                <span className={styles.date}>{shortDate}</span>
            </div>
        </div>
    )
}