import { User } from "@prisma/client";
import { IArticle } from "../../../types/types";
import CommentForm from "./CommentForm";
import Comment from './Comment';

export default function Comments({ user, article }: { user: User | null, article: IArticle }) {
    const role = user?.role || 'guest';
    const comments = article.comments.map(c => <Comment key={c.id} comment={c} authorId={article.author.id} />);

    return (
        <>
            <CommentForm articleId={article.id} role={role} />
            {comments}
        </>
    );
}