import { CardPrevisto } from './CardPrevisto';
import { Empty } from '../Empty';

interface Previsto {
  id: string;
  slugprevisto: string;
  subtitleprevisto: string;
  titleprevisto: string;
  createdAt: string;
  previstoCoverImage?: {
    url: string;
  };
  author: {
    name: string;
  };
}

interface ListaPrevistosProps {
  previstos: Previsto[];
}

export const ListaPrevistos: React.FC<ListaPrevistosProps> = ({ previstos }) => {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {previstos.length > 0 ? (
        previstos.slice(0).map((previsto) => (
          <CardPrevisto
            key={previsto.id}
            title={previsto.titleprevisto}
            subtitle={previsto.subtitleprevisto}
            createdAt={previsto.createdAt}
            urlImage={previsto.previstoCoverImage?.url || '/path/to/default/image.jpg'} // URL de imagem padrão
            slug={previsto.slugprevisto}
            author={previsto.author.name}
          />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};
