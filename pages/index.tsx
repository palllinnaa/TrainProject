import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from '../lib/posts';
import path from 'path';
import Link from 'next/link';
import Date from '../components/data';
import { GetStaticProps } from 'next';
import { IPostsData } from '../src/interfaces';

interface IHomeProps {
  allPostsData: IPostsData[];
  // allPostsData: Array<IPostsData>;
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData:IPostsData[] = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const postsDirectory: string = path.join(process.cwd(), 'posts');

export default function Home(props: IHomeProps) {
  const { allPostsData } = props;

  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Self Introduction</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map((item: IPostsData) => (
            <li className={utilStyles.listItem} key={item.id}>Gray
              </small>
            </li>
          ))}
        </ul>
        <Link href="/startTailwind?">Tailwind</Link>
      </section>      
    </Layout>
  );
}