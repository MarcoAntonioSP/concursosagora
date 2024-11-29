import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

// Consultas GraphQL
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

const GET_ALL_PREVISTOS = gql`
  query GetAllPrevistos {
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

interface Post {
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
}

interface Previsto {
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
}

interface Emprego {
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
}

interface Noticia {
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
}

interface Federal {
  id: string;
  slugfederal: string;
  titlefederal: string;
  createdAt: string;
  federalCoverImage: {
    url: string;
  };
  author: {
    name: string;
  };
}

interface PostsData {
  posts: Post[];
}

interface PrevistosData {
  previstos: Previsto[];
}

interface EmpregosData {
  empregos: Emprego[];
}

interface NoticiasData {
  noticias: Noticia[];
}

interface FederaisData {
  federais: Federal[];
}

export default function PostsList() {
  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery<PostsData>(GET_ALL_POSTS);
  const {
    loading: previstosLoading,
    error: previstosError,
    data: previstosData,
  } = useQuery<PrevistosData>(GET_ALL_PREVISTOS);
  const {
    loading: empregosLoading,
    error: empregosError,
    data: empregosData,
  } = useQuery<EmpregosData>(GET_ALL_EMPREGOS);
  const {
    loading: noticiasLoading,
    error: noticiasError,
    data: noticiasData,
  } = useQuery<NoticiasData>(GET_ALL_NOTICIAS);
  const {
    loading: federaisLoading,
    error: federaisError,
    data: federaisData,
  } = useQuery<FederaisData>(GET_ALL_FEDERAIS);

  if (
    postsLoading ||
    previstosLoading ||
    empregosLoading ||
    noticiasLoading ||
    federaisLoading
  )
    return <p>Carregando...</p>;
  if (
    postsError ||
    previstosError ||
    empregosError ||
    noticiasError ||
    federaisError
  )
    return <p>Erro ao carregar os dados</p>;

  const secondPost = postsData?.posts[3];
  const thirtPost = postsData?.posts[4];
  const secondPrevisto = previstosData?.previstos[1];
  const secondEmprego = empregosData?.empregos[1];
  const secondNoticia = noticiasData?.noticias[1];
  const secondFederal = federaisData?.federais[1];

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="flex w-full text-gray-800 flex-col mt-1 mb-1 space-y-8 p-2">
        {secondPost && (
          <div
            className="border-b-2 border-t-2 mt-1 pb-7 pt-7 border-stone-200"
            key={secondPost.id}
          >
            <Link
              href={`/aberto/${secondPost.slug}`}
              className="flex w-full flex-col md:flex-row"
            >
              <div className="flex relative flex-shrink-0 mb-4 md:mb-0 md:w-1/3">
                <Image
                  src={secondPost.coverImage.url}
                  alt={secondPost.title}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex ms-2 flex-col justify-around w-full">
                <h2 className="text-2xl">{secondPost.title}</h2>
                <p className="post-subtitle">{secondPost.subtitle}</p>
                <div className="flex text-sm font-semibold">
                  <p className="post-author">{secondPost.author.name} | </p>
                  <p className="ms-1 text-gray-500">
                    {format(
                      new Date(secondPost.createdAt),
                      "dd 'de' MMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {thirtPost && (
          <div
            className="border-b-2 border-t-2 mt-1 pb-7 pt-7 border-stone-200"
            key={thirtPost.id}
          >
            <Link
              href={`/aberto/${thirtPost.slug}`}
              className="flex w-full flex-col md:flex-row"
            >
              <div className="flex relative flex-shrink-0 mb-4 md:mb-0 md:w-1/3">
                <Image
                  src={thirtPost.coverImage.url}
                  alt={thirtPost.title}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex ms-2 flex-col justify-around w-full">
                <h2 className="text-2xl">{thirtPost.title}</h2>
                <p className="post-subtitle">{thirtPost.subtitle}</p>
                <div className="flex text-sm font-semibold">
                  <p className="post-author">{thirtPost.author.name} | </p>
                  <p className="ms-1 text-gray-500">
                    {format(
                      new Date(thirtPost.createdAt),
                      "dd 'de' MMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {secondPrevisto && (
          <div
            className="border-b-2 border-t-2 mt-1 pb-7 pt-7 border-stone-200"
            key={secondPrevisto.id}
          >
            <Link
              href={`/previsto/${secondPrevisto.slugprevisto}`}
              className="flex w-full flex-col md:flex-row"
            >
              <div className="flex relative flex-shrink-0 mb-4 md:mb-0 md:w-1/3">
                <Image
                  src={secondPrevisto.previstoCoverImage.url}
                  alt={secondPrevisto.titleprevisto}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex ms-2 flex-col justify-around w-full">
                <h2 className="text-2xl">{secondPrevisto.titleprevisto}</h2>
                <p className="post-subtitle">
                  {secondPrevisto.subtitleprevisto}
                </p>
                <div className="flex text-sm font-semibold">
                  <p className="post-author">{secondPrevisto.author.name} | </p>
                  <p className="ms-1 text-gray-500">
                    {format(
                      new Date(secondPrevisto.createdAt),
                      "dd 'de' MMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {secondEmprego && (
          <div
            className="border-b-2 pb-5 border-stone-200"
            key={secondEmprego.id}
          >
            <Link
              href={`/emprego/${secondEmprego.slugemprego}`}
              className="flex w-full flex-col md:flex-row"
            >
              <div className="flex relative flex-shrink-0 mb-4 md:mb-0 md:w-1/3">
                <Image
                  src={secondEmprego.empregoCoverImage.url}
                  alt={secondEmprego.titleemprego}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex ms-2 flex-col justify-around w-full">
                <h2 className="text-2xl">{secondEmprego.titleemprego}</h2>
                <p className="post-subtitle">{secondEmprego.subtitlemprego}</p>
                <div className="flex font-semibold">
                  <p className="post-author">{secondEmprego.author.name}</p>
                  <p className="ms-1 text-gray-500">
                    {format(
                      new Date(secondEmprego.createdAt),
                      "dd 'de' MMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {secondNoticia && (
          <div
            className="border-b-2 pb-5 border-stone-200"
            key={secondNoticia.id}
          >
            <Link
              href={`/noticia/${secondNoticia.slugnoticia}`}
              className="flex w-full flex-col md:flex-row"
            >
              <div className="flex relative flex-shrink-0 mb-4 md:mb-0 md:w-1/3">
                <Image
                  src={secondNoticia.noticiaCoverImage.url}
                  alt={secondNoticia.titlenoticia}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex ms-2 flex-col justify-around w-full">
                <h2 className="text-2xl">{secondNoticia.titlenoticia}</h2>
                <p className="post-subtitle">{secondNoticia.subtitlenoticia}</p>
                <div className="flex font-semibold">
                  <p className="post-author">{secondNoticia.author.name}</p>
                  <p className="ms-1 text-gray-500">
                    {format(
                      new Date(secondNoticia.createdAt),
                      "dd 'de' MMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {secondFederal && (
          <div
            className="border-b-2 pb-5 border-stone-200"
            key={secondFederal.id}
          >
            <Link
              href={`/federal/${secondFederal.slugfederal}`}
              className="flex w-full flex-col md:flex-row"
            >
              <div className="flex relative flex-shrink-0 mb-4 md:mb-0 md:w-1/3">
                <Image
                  src={secondFederal.federalCoverImage.url}
                  alt={secondFederal.titlefederal}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex ms-2 flex-col justify-around w-full">
                <h2 className="text-2xl">{secondFederal.titlefederal}</h2>
                <div className="flex font-semibold">
                  <p className="post-author">{secondFederal.author.name}</p>
                  <p className="ms-1 text-gray-500">
                    {format(
                      new Date(secondFederal.createdAt),
                      "dd 'de' MMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="w-full sm:w-3/10 m-1 mb-5 md:mb-72 sticky top-0 mt-10 h-screen">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Como se Preparar para Concursos Públicos 🎓
        </h2>
        <p className="text-base text-gray-800 mb-4">
          Preparar-se para um concurso público pode ser desafiador, mas com a
          estratégia certa, você pode alcançar o sucesso. Aqui estão algumas
          dicas valiosas:
        </p>
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-blue-700">
            1. Planeje seu Estudo 🗓️
          </h2>
          <p className="text-gray-800">
            Crie um cronograma de estudos realista e detalhado. Defina metas
            diárias.
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-green-700">
            2. Entenda o Edital 📋
          </h2>
          <p className="text-gray-800">
            Leia o edital para entender os requisitos, conteúdos e formato da
            prova.
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-yellow-700">
            3. Faça Revisões Periódicas 🔄
          </h2>
          <p className="text-gray-800">
            Utilize resumos e flashcards para revisar o conhecimento
            regularmente.
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-red-700">
            4. Pratique com Simulados 📚
          </h2>
          <p className="text-gray-800">
            Realize simulados e provas anteriores para identificar áreas que
            precisam de mais atenção.
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-purple-700">
            5. Cuide da Saúde 🧘‍♂️
          </h2>
          <p className="text-gray-800">
            Mantenha uma rotina saudável com alimentação, exercícios e sono
            adequado.
          </p>
        </div>
        <p className="text-base mb-96 text-gray-800">
          Lembre-se, a preparação para um concurso público exige dedicação e
          persistência. Boa sorte! 🍀
        </p>
      </div>
    </div>
  );
}
