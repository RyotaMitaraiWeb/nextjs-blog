import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useState } from "react";
import { AuthorGuard } from "../../../src/guards/AuthorGuard";
import { WriterGuard } from "../../../src/guards/WriterGuard";
import { IArticle } from "../../../types/types";
import { authOptions } from "../../api/auth/[...nextauth]";
import styles from '../article.module.scss';

export default function EditArticle({ article }: { article: IArticle }) {
    const [disabled, setDisabled] = useState(false);
    return (
        <section className={styles.create}>
            <h1>Edit this article</h1>
            <form action={`/api/article/${article.id}/edit`} method="POST" onSubmit={() => setDisabled(true)}>
                <div className={styles.field}>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        required
                        sx={{
                            width: '60%',
                        }}
                        defaultValue={article.title}
                    />
                </div>
                <div className="field">
                    <TextField
                        id="content"
                        name="content"
                        label="Content"
                        required
                        multiline
                        sx={{
                            width: '80%',
                        }}
                        minRows={10}
                        defaultValue={article.content}
                    />
                </div>
                <Button 
                    variant="contained" 
                    className={styles.submit} 
                    type="submit"
                    disabled={disabled}
                >
                    <Add />
                    Create article
                </Button>
            </form>
        </section>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    const user = session?.user as User | null;
    const role = user?.role || 'guest';
    const userId = user?.id;

    const id = context?.params?.id || '';
    const res = await fetch(`http://localhost:3000/api/article/${id}`);
    const article: IArticle = await res.json();
    const authorId = article.author.id;

    if (!AuthorGuard(userId, authorId, role)) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            article,
        }
    }
}