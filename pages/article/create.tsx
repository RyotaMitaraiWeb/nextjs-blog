import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useState } from "react";
import { WriterGuard } from "../../src/guards/WriterGuard";
import { authOptions } from "../api/auth/[...nextauth]";
import styles from './article.module.scss';

export default function CreateArticle() {
    const [disabled, setDisabled] = useState(false);
    return (
        <section className={styles.create}>
            <h1>Publish a new article</h1>
            <form action="/api/article/create" method="POST" onSubmit={() => setDisabled(true)}>
                <div className={styles.field}>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        required
                        sx={{
                            width: '60%',
                        }}
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
    if (!WriterGuard(role)) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            }
        }
    }

    return {
        props: {
            user,
        }
    }
}