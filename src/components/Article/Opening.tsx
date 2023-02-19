import { Avatar } from "@mui/material";
import { IArticle } from "../../../types/types";
import styles from './article.module.scss';

export default function Opening({ article }: { article: IArticle }) {
    const paragraphs = article.content
        .split(/^\n+/gmi)
        .filter(p => p !== '\r')
        .map((paragraph, index) => <p key={index}>{paragraph}</p>);

    return (
        <section className={styles.article}>
            <h1>{article.title}</h1>
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
                <span className={styles.name}>{article.author.name}</span>
                
                <span className={styles.date}>{shortDate}</span>
            </div>
        </div>
    )
}