import { GetServerSideProps } from "next";
import Opening from "../../src/components/Article/Opening";
import { IArticle } from "../../types/types";
import styles from './article.module.scss';

export default function Article({ article }: { article: IArticle }) {
    return <Opening article={article} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id;
    const res = await fetch('http://localhost:3000/api/article/' + id);
    const article = await res.json();

    return {
        props: {
            article,
        }
    }
}