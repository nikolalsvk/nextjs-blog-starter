import Layout from "../components/layout";
import { posts, getPostBySlug } from "../lib/posts";
import ReactMarkdown from "react-markdown";
import NextImage from "next/image";
import highlight from "highlight.js";

const Post = ({ content, frontmatter }) => {
  return (
    <Layout>
      <article>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>

        <ReactMarkdown
          components={{
            code: ({ ...props }) => <Code {...props} />,
            img: ({ ...props }) => <Image {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </Layout>
  );
};

const Code = ({ children, className, ...props }) => {
  const highlightedHtml = highlight.highlightAuto(children[0]).value;

  return (
    <pre>
      <code
        className={`${className} hljs`}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </pre>
  );
};

const Image = ({ src, ...props }) => {
  return (
    <NextImage
      src={require(`../content/images/${src}`)}
      {...props}
      placeholder="blur"
      layout="responsive"
    />
  );
};

export default Post;

export async function getStaticProps({ params }) {
  const { content, frontmatter } = getPostBySlug(params.slug);

  return {
    props: {
      content,
      frontmatter,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = posts();

  return {
    paths: allPosts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
