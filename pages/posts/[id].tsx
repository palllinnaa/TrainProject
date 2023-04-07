import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/data';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths, GetServerSideProps, GetStaticPropsResult } from 'next';
import { IParams, IPostsData } from '..//..//src/interfaces';

interface IPostProps{
    postData:IPostsData;
}

export default function Post(props:IPostProps){
    const {postData} = props;
    return (
        <Layout home={false}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}


export const getStaticPaths:GetStaticPaths= async () => {
    const paths: IParams[] = getAllPostIds();
    return{
        paths, 
        fallback: false,
    };
}

export const getStaticProps:GetStaticProps = async(context: IParams) => {
    const postData: IPostsData = await getPostData(context.params.id);
    return{
        props: {
            postData,
        },
    };
}