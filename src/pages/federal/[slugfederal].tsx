import Head from "next/head";
import Image from "next/image";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { client } from "@/lib/apollo";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Header } from "@/components/Header";
import Footer from "@/components/footer/Footer";

const GET_FEDERAL_BY_SLUG = gql`
  query GetFederalBySlug($slug: String!) {
    federal(where: { slugfederal: $slug }) {
      id
      slugfederal
      titlefederal
      subtitlefederal
      contentFederal
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

interface Federal {
  id: string;
  slugfederal: string;
  titlefederal: string;
  subtitlefederal: string;
  contentFederal: string;
  createdAt: string;
  federalCoverImage: {
    url: string;
  };
  author: {
    name: string;
  };
}

interface FederalProps {
  federal: Federal;
}

export default function FederalPage({ federal }: FederalProps) {
  return (
    <>
      <Head>
        <title>{federal.titlefederal}</title>
        <meta name="description" content={federal.subtitlefederal} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Header />
        
        <div>
          <Link
            href="/"
            className="flex w-full max-w-fit font-bold text-zinc-900 hover:text-zinc-600"
          >
            Voltar para as Oportunidades Federais
          </Link>
        </div>
        
        <div className="mt-10">
          <h1 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md">{federal.titlefederal}</h1>
          <p className="text-zinc-600 text-sm md:text-base mt-4">{federal.subtitlefederal}</p>
        </div>

        <div className="w-full mt-10 relative rounded-2xl overflow-hidden">
          {federal.federalCoverImage ? (
            <Image
              src={federal.federalCoverImage.url}
              alt={federal.titlefederal}
              layout="responsive"
              width={1120}
              height={500}
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span>Imagem não disponível</span>
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="text-zinc-600 text-sm md:text-base">{federal.contentFederal}</p>
        </div>

        <div className="mt-6">
          <p className="font-bold text-zinc-900 text-sm md:text-base">{federal.author.name}</p>
          <p className="text-zinc-600 text-xs md:text-sm">
            {format(new Date(federal.createdAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slugfederal } = params as { slugfederal: string };

  try {
    const { data } = await client.query({
      query: GET_FEDERAL_BY_SLUG,
      variables: { slug: slugfederal },
    });

    return {
      props: {
        federal: data.federal,
      },
    };
  } catch (error) {
    console.error("Erro ao carregar a federal:", error);
    return {
      notFound: true,
    };
  }
};
