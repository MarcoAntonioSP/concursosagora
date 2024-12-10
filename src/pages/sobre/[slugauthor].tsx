import { gql } from "@apollo/client";
import { client } from "@/lib/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "@graphcms/rich-text-react-renderer"; 
import Image from "next/image";
import { Header } from "@/components/Header";
import Footer from "@/components/footer/Footer";

// Query para pegar os dados do autor, incluindo o slug
const GET_AUTHOR = gql`
  query MyQuery {
    authors {
      id
      name
      contentauthor {
        json
      }
      coverImageAuthor {
        url
      }
      slugauthor
    }
  }
`;

// Tipagem do conteúdo autor
interface ContentAuthor {
  json: any; // Podemos melhorar a tipagem se tivermos mais informações sobre o formato do conteúdo
}

interface AuthorProps {
  author: {
    id: string;
    name: string;
    coverImageAuthor?: {
      url: string;
    };
    contentauthor: {
      json: any;
    };
  };
}

const AuthorPage = ({ author }: AuthorProps) => {
  return (
    <>
      <Header />
      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <h1 className="font-bold text-2xl text-center mb-5">{author.name}</h1>
        {author.coverImageAuthor?.url && (
          <div className="flex justify-center mb-6">
            <Image
              src={author.coverImageAuthor.url}
              alt={author.name}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        )}
        <div className="content">
          <RichText
            content={author.contentauthor.json} 
            renderers={{
              p: ({ children }) => (
                <p className="text-zinc-600 text-sm sm:text-base text-justify lg:text-left mt-1 mb-4">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

// Função para obter os dados do autor com base no slug
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slugauthor } = params as { slugauthor: string };

  try {
    const { data } = await client.query({
      query: GET_AUTHOR,
    });

    // Filtrando o autor específico baseado no slug
    const author = data?.authors?.find(
      (author: { slugauthor: string }) => author.slugauthor === slugauthor
    );

    if (!author) {
      return { notFound: true };
    }

    return {
      props: { author },
      revalidate: 60 * 30, // Revalidando a cada 30 minutos
    };
  } catch (error) {
    console.error("Erro ao buscar dados do autor:", error);
    return { notFound: true };
  }
};

// Função para obter os caminhos dinâmicos (slugs dos autores)
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: GET_AUTHOR,
    });

    // Gerando os paths usando o slug do autor
    const paths = data?.authors?.map((author: { slugauthor: string }) => ({
      params: { slugauthor: author.slugauthor },
    })) || [];

    return {
      paths,
      fallback: "blocking", // Aguarda até que as páginas estejam geradas
    };
  } catch (error) {
    console.error("Erro ao buscar paths de autores:", error);
    return { paths: [], fallback: "blocking" };
  }
};

export default AuthorPage;
