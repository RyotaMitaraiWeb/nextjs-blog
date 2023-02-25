import { Create } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader } from "@mui/material";
import { IComment } from "../../../types/types";
import Link from "../../Link";
import styles from './comment.module.scss';
export default function Comment({ comment, authorId }: { comment: IComment, authorId: string }) {
    const date = new Date(comment.createdAt);
    const shortDate = date.toLocaleDateString('en', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const authorEmblem = <AuthorEmblem isAuthor={comment.author.id === authorId} />
    const paragraphs = comment.content
        .split(/^\n+/gmi)
        .filter(p => p !== '\r')
        .map((paragraph, index) => <p key={index}>{paragraph}</p>);
    return (
        <Card className={styles.comment}>
            <CardHeader
                title={
                    <h3><Link href={`/profile/${comment.author.id}`}>{comment.author.name}</Link></h3>
                }
                avatar={
                    <Avatar src={comment.author.image} imgProps={{
                        referrerPolicy: 'no-referrer'
                    }} />
                }
                subheader={
                    <>
                        {authorEmblem}
                        <span className={styles.commentDate}>{shortDate}</span>
                    </>
                }
            />
            <CardContent>
                {paragraphs}
            </CardContent>
        </Card>
    );
}

function AuthorEmblem({ isAuthor }: { isAuthor: boolean }) {
    if (!isAuthor) {
        return (
            <div className={styles.author}>
                <span>reader</span>
            </div>
        );
    }

    return (
        <div className={styles.author}>
            <strong>
                <Create />
                Author
            </strong>
        </div>
    );
}