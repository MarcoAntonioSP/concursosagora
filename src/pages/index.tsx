import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CardPost } from "@/components/postabertos/CardPost";
import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
import { client } from "@/lib/apollo";
import { ListaPrevistos } from "@/components/previstos/ListaPrevistos";
import { ListaEmpregos } from "@/components/empregos/ListaEmpregos";
import Footer from "@/components/footer/Footer";
import Empty from "@/components/Empty";
import FeaturedArticle from "@/components/FeaturedArticle/FeaturedArticle";
import { ListaNoticias } from "@/components/noticias/ListaNoticias";
import { ListaFederais } from "@/components/federais/ListaFederal";

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
        name
        coverImageAuthor {
          url
        }
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

const GET_ALL_EMPREGOS = gql`
  query GetAllEmpregos {
    empregos(orderBy: updatedAt_DESC) {
      id
      slugemprego
      titleemprego
      subtitlemprego
      createdAt
      empregoCoverImage {
        url
      }
      author {
        name
      }
    }
  }
`;

const GET_ALL_NOTICIAS = gql`
  query GetAllNoticias {
    noticias(orderBy: updatedAt_DESC) {
      id
      slugnoticia
      titlenoticia
      subtitlenoticia
      createdAt
      noticiaCoverImage {
        url
      }
      author {
        name
      }
    }
  }
`;

const GET_ALL_FEDERAIS = gql`
  query GetAllFederais {
    federais(orderBy: updatedAt_DESC) {
      id
      slugfederal
      titlefederal
      createdAt
      federalCoverImage {
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

interface AllEmpregos {
  empregos: {
    id: string;
    slugemprego: string;
    subtitlemprego: string;
    titleemprego: string;
    createdAt: string;
    empregoCoverImage: {
      url: string;
    };
    author: {
      name: string;
    };
  }[];
}

interface AllNoticias {
  noticias: {
    id: string;
    slugnoticia: string;
    titlenoticia: string;
    subtitlenoticia: string;
    createdAt: string;
    noticiaCoverImage: {
      url: string;
    };
    author: {
      name: string;
    };
  }[];
}

interface AllFederais {
  federais: {
    id: string;
    slugfederal: string;
    subtitlefederal: string;
    titlefederal: string;
    createdAt: string;
    federalCoverImage: {
      url: string;
    };
    contentFederal: string;
    author: {
      name: string;
    };
  }[];
}

export default function Home({
  posts,
  previstos,
  empregos,
  noticias,
  federais,
}: AllPosts & AllPrevistos & AllEmpregos & AllNoticias & AllFederais) {
  return (
    <>
      <Head>
        <title>ConcursosAgora | Concursos Públicos e Empregos no Brasil</title>
        <meta
          name="description"
          content="Encontre concursos públicos e vagas de emprego atualizados, com informações sobre editais, inscrições e muito mais. Mantenha-se informado com a ConcursosAgora!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="concursos públicos, empregos, editais, inscrições, vagas, Brasil, oportunidades de emprego"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ConcursosAgora.com.br/" />
        <meta
          property="og:title"
          content="ConcursosAgora | Concursos Públicos e Empregos no Brasil"
        />
        <meta
          property="og:description"
          content="Encontre todas as informações atualizadas sobre concursos públicos e oportunidades de emprego no Brasil. Acompanhe os últimos editais, inscrições e muito mais."
        />
        <meta
          property="og:image"
          content="https://www.concursoscgora.com.br/images/og-image.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.concursoscgora.com.br/"
        />
        <meta
          property="twitter:title"
          content="ConcursosAgora | Concursos Públicos e Empregos no Brasil"
        />
        <meta
          property="twitter:description"
          content="Encontre todas as informações atualizadas sobre concursos públicos e oportunidades de emprego no Brasil. Acompanhe os últimos editais, inscrições e muito mais."
        />
        <meta
          property="twitter:image"
          content="https://www.concursosagora.com.br/images/twitter-image.jpg"
        />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ConcursosAgora" />
        <link rel="canonical" href="https://www.concursosagora.com.br/" />
        <meta property="og:site_name" content="ConcursosAgora" />
        <meta name="twitter:site" content="@concursosagora" />
      </Head>
      <div className="w-full max-w-[1120px] flex flex-col mx-auto  pb-6 px-4">
        <Header />
        {posts ? (
          <>
            {/* Quero exibir somente o titulo  */}
            {noticias.length > 0 && (
              <Link
                href={`/noticia/${noticias[0].slugnoticia}`}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 w-full h-full p-4 sm:p-6 mt-12 hover:brightness-75 transition-all"
              >
                <div className="flex flex-1 flex-col gap-3 lg:gap-6 text-center sm:text-left">
                  <h1 className="font-bold text-xl text sm:text-2xl md:text-3xl lg:text-4xl text-blue-600 line-clamp-2">
                    {noticias[0].titlenoticia}
                  </h1>
                  <div>
                    {/* Você pode adicionar mais conteúdo aqui se necessário */}
                  </div>
                </div>
              </Link>
            )}

            <Link
              href={`/aberto/${posts[0].slug}`}
              className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-1 hover:brightness-75 transition-all"
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
                <div>
                  <p className="font-bold text-zinc-900 text-sm md:text-base">
                    {posts[0].title}
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
            </Link>
            <div>
              <h2 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-10 ml-5 mb-">
                Concursos Abertoss
              </h2>
            </div>
            <div className="flex flex-col items-center sm:grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 mt-12">
              {posts.slice(1, 4).map((post) => (
                <CardPost
                  key={post.id}
                  title={post.title}
                  author={post.author.name}
                  createdAt={post.createdAt}
                  subtitle={post.subtitle}
                  urlImage={post.coverImage.url}
                  slug={post.slug}
                />
              ))}
            </div>
            <div>
              <h2 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-5 ml-5">
                Próximos Concursos
              </h2>
              <ListaPrevistos previstos={previstos.slice(0, 3)} />
            </div>
            <div>
              <h2 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-5 ml-5">
                Oportunidades de Emprego
              </h2>
              <ListaEmpregos empregos={empregos.slice(0, 3)} />
            </div>
            <div>
              <h2 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-5 ml-5">
                Noticias
              </h2>
              <ListaNoticias noticias={noticias.slice(0, 3)} />
            </div>
            <div>
              <h2 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-5 ml-5">
                Federais
              </h2>
              <ListaFederais federais={federais.slice(0, 3)} />
            </div>
          </>
        ) : (
          <Empty />
        )}
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: postsData } = await client.query({ query: GET_ALL_POSTS });
  const { data: previstosData } = await client.query({
    query: GET_ALL_PREVISTOS,
  });
  const { data: empregosData } = await client.query({
    query: GET_ALL_EMPREGOS,
  });
  const { data: noticiasData } = await client.query({
    query: GET_ALL_NOTICIAS,
  });
  const { data: federaisData } = await client.query({
    query: GET_ALL_FEDERAIS,
  });

  return {
    props: {
      posts: postsData.posts,
      previstos: previstosData.previstos,
      empregos: empregosData.empregos,
      noticias: noticiasData.noticias,
      federais: federaisData.federais,
    },
  };
};
