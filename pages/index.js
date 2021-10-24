import styles from "../styles/Home.module.css";
import { posts } from "../lib/posts";
import Layout from "../components/layout";

export default function Home({ allPosts }) {
  if (!allPosts || !allPosts.length) return;

  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className={styles.description}>
        Get started by editing{" "}
        <code className={styles.code}>pages/index.js</code>
      </p>

      {allPosts.map((post) => (
        <div key={post.slug} className={styles.grid}>
          <a href={post.slug} className={styles.card}>
            <h2>{post.frontmatter.title}</h2>
            <span>{post.frontmatter.date}</span>
            <p>{post.frontmatter.description}</p>
          </a>
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = posts();

  return {
    props: {
      allPosts,
    },
  };
}
