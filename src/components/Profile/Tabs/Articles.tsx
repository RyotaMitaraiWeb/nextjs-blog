import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { User } from "@prisma/client";
import { ArticleCard } from "../../../../pages/article/all";
import { IArticleCard, IUser } from "../../../../types/types";
import Link from "../../../Link";
import styles from '../profile.module.scss';

export default function UserArticles({ user }: { user: IUser | null }) {
    const articles = user?.articles || [];
    const articleCards = articles.map(a => <ArticleCard article={a} user={user} key={a.id} />);
    return <>{articleCards}</>;
}