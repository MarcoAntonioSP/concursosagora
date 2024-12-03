import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CardPost } from "@/components/postabertos/CardPost"; // Certifique-se de que a importação está correta
import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
import { client } from "@/lib/apollo";
import Footer from "@/components/footer/Footer";
import Empty from "@/components/Empty";
import PostsList from "@/components/postabertos/PostsList";

// Query para posts
const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(orderBy: createdAt_DESC) {
      id
      slug
      subtitle
      title
      createdAt
      coverImage {
        url
      }
      author {
        coverImageAuthor {
          url
        }
        name
      }
    }
  }
`;

// Query para previstos
const GET_ALL_PREVISTOS = gql`
  query MyQuery {
    previstos(orderBy: updatedAt_DESC) {
      id
      slugprevisto
      subtitleprevisto
      titleprevisto
      createdAt
      previstoCoverImage {
        url
      }
      author {
        name
      }
    }
  }
`;

interface AllPosts {
  posts: {
    id: string;
    slug: string;
    subtitle: string;
    title: string;
    createdAt: string;
    coverImage: {
      url: string;
    };
    author: {
      name: string;
      coverImageAuthor?: {
        url: string;
      };
    };
  }[];
}

interface AllPrevistos {
  previstos: {
    id: string;
    slugprevisto: string;
    subtitleprevisto: string;
    titleprevisto: string;
    createdAt: string;
    previstoCoverImage: {
      url: string;
    };
    author: {
      name: string;
    };
  }[];
}

export default function Abertos({ posts, previstos }: AllPosts & AllPrevistos) {
  const sortedPrevistos = previstos
    .slice(4, 0)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  return (
    <>
      <Head>
        <title>Concursos Agora - Concursos Abertos</title>
        <meta
          name="description"
          content="Descubra os concursos públicos abertos no Brasil. Fique por dentro das oportunidades de emprego e informações detalhadas sobre inscrições e editais."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="concursos públicos, concursos abertos, empregos, oportunidades, editais, inscrições, vagas"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.concursosagora.com.br/abertos"
        />
        <meta
          property="og:title"
          content="Concursos Agora - Concursos Abertos"
        />
        <meta
          property="og:description"
          content="Descubra os concursos públicos abertos no Brasil. Fique por dentro das oportunidades de emprego e informações detalhadas sobre inscrições e editais."
        />
        <meta
          property="og:image"
          content="https://www.concursosagora.com.br/images/og-image.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.concursosagora.com.br/abertos"
        />
        <meta
          property="twitter:title"
          content="Concursos Agora - Concursos Abertos"
        />
        <meta
          property="twitter:description"
          content="Descubra os concursos públicos abertos no Brasil. Fique por dentro das oportunidades de emprego e informações detalhadas sobre inscrições e editais."
        />
        <meta
          property="twitter:image"
          content="https://www.concursosagora.com.br/images/twitter-image.jpg"
        />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Concursos Agora" />
        <link
          rel="canonical"
          href="https://www.concursosagora.com.br/abertos"
        />
        <meta property="og:site_name" content="Concursos Agora" />
        <meta name="twitter:site" content="@concursosagora" />
      </Head>
      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Header />
        {posts ? (
          <>
            <Link
              href="/"
              className="flex w-full max-w-fit font-bold text-zinc-900 hover:text-zinc-600"
            >
              Voltar
            </Link>
            <div>
              <h1 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-10 ml-5 mb-">
                {" "}
                Concursos Abertos
              </h1>
            </div>
            <Link
              href={`/aberto/${posts[0].slug}`}
              className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all"
            >
              <div className="flex flex-1 w-full h-full min-h-[240px] md:min-h-[334px] relative overflow-hidden">
                <Image
                  src={posts[0].coverImage.url}
                  alt=""
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-1 h-full flex-col gap-3 lg:gap-6">
                <h1 className="font-bold text-3xl md:text-[40px] text-blue-600 line-clamp-2">
                  {posts[0].title}
                </h1>
                <p className="text-zinc-600 text-sm md:text-base text-justify lg:text-left line-clamp-3">
                  {posts[0].subtitle}
                </p>
              </div>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="block">
                <div className="author-info flex items-center mt-2">
                  {posts[0].author.coverImageAuthor?.url && (
                    <Image
                      src={posts[0].author.coverImageAuthor.url}
                      alt={posts[0].author.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-2"
                    />
                  )}
                  <div>
                    <p className="font-bold text-zinc-900 text-sm md:text-base">
                      {posts[0].author.name}
                    </p>
                    <p className="text-zinc-600 text-xs md:text-sm">
                      {format(
                        new Date(posts[0].createdAt),
                        "dd 'de' MMM 'de' yyyy",
                        { locale: ptBR }
                      )}
                    </p>
                  </div>
                </div>
              </a>
            </Link>

            <div className="flex flex-col items-center sm:grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 mt-12">
              {posts.slice(1, 120).map((post) => (
                <CardPost
                  key={post.id}
                  title={post.title}
                  author={post.author.name}
                  authorImage={post.author.coverImageAuthor?.url || ""}
                  createdAt={post.createdAt}
                  subtitle={post.subtitle}
                  urlImage={post.coverImage.url}
                  slug={post.slug}
                />
              ))}
            </div>
          </>
        ) : (
          <Empty />
        )}
      </div>
      <PostsList />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: postsData } = await client.query({ query: GET_ALL_POSTS });
  const { data: previstosData } = await client.query({
    query: GET_ALL_PREVISTOS,
  });

  return {
    props: {
      posts: postsData.posts,
      previstos: previstosData.previstos,
    },
  };
};
