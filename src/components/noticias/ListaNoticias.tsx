import { CardNoticias } from './CardNoticias';
import Empty from "@/components/Empty";

interface Noticia {
  id: string;
  slugnoticia: string;
  subtitlenoticia: string;
  titlenoticia: string;
  createdAt: string;
  noticiaCoverImage?: {
    url: string;
  };
  author: {
    name: string;
  };
}

interface ListaNoticiasProps {
  noticias: Noticia[];
}

export const ListaNoticias: React.FC<ListaNoticiasProps> = ({ noticias }) => {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {noticias.length > 0 ? (
        noticias.map((noticia) => (
          <CardNoticias
            key={noticia.id}
            title={noticia.titlenoticia}
            subtitle={noticia.subtitlenoticia}
            createdAt={noticia.createdAt}
            urlImage={noticia.noticiaCoverImage?.url || '/path/to/default/image.jpg'}
            slug={noticia.slugnoticia}
            author={noticia.author.name}
          />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};
