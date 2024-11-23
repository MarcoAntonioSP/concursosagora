import { CardFederal } from './CardFederal';
import Empty from "@/components/Empty";

interface Federal {
  id: string;
  slugfederal: string;
  subtitlefederal: string;
  titlefederal: string;
  createdAt: string;
  federalCoverImage?: {
    url: string;
  };
  author: {
    name: string;
  };
}

interface ListaFederaisProps {
  federais: Federal[];
}

export const ListaFederais: React.FC<ListaFederaisProps> = ({ federais }) => {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {federais.length > 0 ? (
        federais.map((federal) => (
          <CardFederal
            key={federal.id}
            title={federal.titlefederal}
            subtitle={federal.subtitlefederal}
            createdAt={federal.createdAt}
            urlImage={federal.federalCoverImage?.url || '/path/to/default/image.jpg'}
            slug={federal.slugfederal}
            author={federal.author.name}
          />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};
