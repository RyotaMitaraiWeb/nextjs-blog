import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import styles from './comment.module.scss';

export default function CommentForm({ role, articleId }: { role: string, articleId: string }) {
    return (
        <section className={styles.comments}>
            <h2>Leave a comment</h2>
            { role === 'guest' ? <GuestInterface /> : <Form id={articleId} /> }
        </section>
    );
}

function Form({ id }: { id: string }) {
    return (
        <form action={`/api/article/${id}/comment/create`} method="POST">
            <TextField 
                name="comment"
                label="Your comment"
                multiline
                required
                minRows={7}
                className={styles.field}
            />
            <Button type="submit" variant="contained">
                <Add />
                Comment
            </Button>
        </form>
    );
}

function GuestInterface() {
    return <p>Log in to leave a comment!</p>;
}