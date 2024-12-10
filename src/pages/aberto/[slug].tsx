import { Header } from "@/components/Header";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { client } from "@/lib/apollo";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { ElementNode } from "@graphcms/rich-text-types";
import Footer from "@/components/footer/Footer";
import PostsList from "@/components/postabertos/PostsList";

const GET_POST = gql`
  query GetPost($slugPost: String) {
    post(where: { slug: $slugPost }) {
      id
      title
      slug
      subtitle
      coverImage {
        url
      }
      content {
        json
      }
      coverImage2 {
        url
      }
      content2 {
        json
      }
      author {
        name
        coverImageAuthor {
          url
        }
      }
      createdAt
    }
  }
`;

interface PostProps {
  post: {
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    coverImage?: {
      url: string;
    };
    content: {
      json: ElementNode[];
    };
    coverImage2?: {
      url: string;
    };
    content2?: {
      json: ElementNode[];
    };
    author: {
      name: string;
      coverImageAuthor?: {
        url: string;
      };
    };
    createdAt: string;
  };
}

export default function Post({ post }: PostProps) {
  if (!post) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Header />

        <Link
          href="/"
          className="flex w-full max-w-fit font-bold text-zinc-900 hover:text-zinc-600"
        >
          Voltar
        </Link>

        <div className="w-full h-full flex flex-col mt-8">
          {post.coverImage && post.coverImage.url && (
            <div className="flex w-full h-56 sm:h-80 lg:h-[392px] relative overflow-hidden">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div className="flex w-full flex-col sm:mt-2">
          <h1 className="font-bold text-2xl text-center mb-5 sm:text-4xl lg:text-[40px] text-blue-600">
            {post.title}
          </h1>
          <h2 className="mt-4 text-xl text-zinc-800">{post.subtitle}</h2>

          <Link href="/" aria-label="link para perfil do autor" >
            <div className="w-full flex items-center mt-2">
              {post.author.coverImageAuthor?.url && (
                <Image
                  src={post.author.coverImageAuthor.url}
                  alt={post.author.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-2"
                />
              )}
              <div>
                <p className="font-bold text-zinc-900">{post.author.name}</p>
                <p className="text-zinc-600 text-sm">
                  {format(new Date(post.createdAt), "dd 'de' MMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          </Link>
          <div className="mt-4 sm:mt-8">
            <RichText
              content={post.content.json}
              renderers={{
                h1: ({ children }) => (
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 my-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500 my-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-500 my-4">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-zinc-600 text-sm sm:text-base text-justify lg:text-left mt-1 mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside ml-4 mb-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside ml-4 mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-zinc-600 text-sm sm:text-base">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                      {children}
                    </table>
                  </div>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-200 rounded px-1 py-0.5">
                    {children}
                  </code>
                ),
                img: (props: Partial<ImageProps>) => {
                  const { src, alt = "" } = props;
                  if (!src) {
                    return <></>;
                  }
                  return (
                    <div className="my-4">
                      <Image
                        src={src}
                        alt={alt}
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                    </div>
                  );
                },
              }}
            />
          </div>
          {post.coverImage2 && post.coverImage2.url && (
            <div className="w-full h-full flex flex-col mt-8">
              <div className="flex w-full h-56 sm:h-80 lg:h-[392px] relative overflow-hidden">
                <Image
                  src={post.coverImage2.url}
                  alt={post.title}
                  fill={true}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          )}

          <div className="mt-4 sm:mt-8">
            {post.content2?.json && (
              <RichText
                content={post.content2.json}
                renderers={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 my-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500 my-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400 my-4">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-zinc-600 text-sm sm:text-base text-justify lg:text-left mt-1 mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside ml-4 mb-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside ml-4 mb-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-zinc-600 text-sm sm:text-base">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-200 rounded px-1 py-0.5">
                      {children}
                    </code>
                  ),
                  img: (props: Partial<ImageProps>) => {
                    const { src, alt = "" } = props;
                    if (!src) {
                      return <></>; // Retorna um fragmento vazio em vez de null
                    }
                    return (
                      <div className="my-4">
                        <Image
                          src={src}
                          alt={alt}
                          width={800}
                          height={450}
                          className="rounded-lg"
                        />
                      </div>
                    );
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
      <PostsList />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;

  try {
    const { data } = await client.query({
      query: GET_POST,
      variables: {
        slugPost: slug,
      },
    });

    if (!data || !data.post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: data.post,
      },
      revalidate: 60 * 30, // 30 min
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
