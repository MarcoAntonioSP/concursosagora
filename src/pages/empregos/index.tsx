import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Empty from "@/components/Empty";
import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
import { client } from "@/lib/apollo";
import { CardEmprego } from "@/components/empregos/CardEmprego";
import Footer from "@/components/footer/Footer";
import PostsList from "@/components/postabertos/PostsList";

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
        coverImageAuthor {
          url
        }
      }
    }
  }
`;

interface AllEmpregos {
  empregos: {
    id: string;
    slugemprego: string;
    titleemprego: string;
    subtitlemprego: string;
    createdAt: string;
    empregoCoverImage: {
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

export default function Empregos({ empregos }: AllEmpregos) {
  return (
    <>
      <Head>
        <title>ConcursosAgora Empregos</title>
        <meta name="description" content="Oportunidades de emprego atualizadas regularmente" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Header />
        <Link
          href="/"
          className="flex w-full max-w-fit font-bold text-zinc-900 hover:text-zinc-600"
        >
          Voltar
        </Link>
        <div>
          <h1 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-10 ml-5 mb-5">
            Oportunidades de Emprego
          </h1>
        </div>

        {empregos.length > 0 && (
          <Link
            href={`/emprego/${empregos[0].slugemprego}`}
            className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all"
          >
            <div className="flex flex-1 w-full h-full min-h-[240px] md:min-h-[334px] relative overflow-hidden">
              <Image
                src={empregos[0].empregoCoverImage.url}
                alt={empregos[0].titleemprego}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-1 h-full flex-col gap-3 lg:gap-6">
              <h1 className="font-bold text-3xl md:text-[40px] text-blue-600 line-clamp-2">
                {empregos[0].titleemprego}
              </h1>
              <p className="text-zinc-600 text-sm md:text-base text-justify lg:text-left line-clamp-3">
                {empregos[0].subtitlemprego}
              </p>
              <div className="flex items-center mt-3">
                {empregos[0].author.coverImageAuthor?.url && (
                  <Image
                    src={empregos[0].author.coverImageAuthor.url}
                    alt={empregos[0].author.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-2"
                  />
                )}
                <div>
                  <p className="font-bold text-zinc-900 text-sm md:text-base">
                    {empregos[0].author.name}
                  </p>
                  <p className="text-zinc-600 text-xs md:text-sm">
                    {format(
                      new Date(empregos[0].createdAt),
                      "dd 'de' MMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {empregos.length > 0 ? (
            empregos.slice(1).map((emprego) => (
              <CardEmprego
                key={emprego.id}
                title={emprego.titleemprego}
                subtitle={emprego.subtitlemprego}
                createdAt={emprego.createdAt}
                urlImage={emprego.empregoCoverImage?.url || "/path/to/default/image.jpg"} // Imagem padrão
                slug={emprego.slugemprego}
                author={emprego.author.name}
                authorImage={emprego.author.coverImageAuthor?.url || "/path/to/default/author-image.jpg"}
              />
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>

      <PostsList />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: GET_ALL_EMPREGOS });
  return {
    props: { empregos: data.empregos },
  };
};
