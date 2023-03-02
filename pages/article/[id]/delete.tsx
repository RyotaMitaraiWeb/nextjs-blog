import { GetServerSideProps } from "next";

export default function DeletePage() {
    return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id;
    await fetch(`http://localhost:3000/api/article/${id}/delete`, {
        headers: {
            cookie: context.req.headers.cookie || '',
        }
    });

    return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
}