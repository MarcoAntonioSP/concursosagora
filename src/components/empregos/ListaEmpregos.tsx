import { CardEmprego } from './CardEmprego';
import { Empty } from '../Empty';

interface Emprego {
  id: string;
  slugemprego: string;
  subtitlemprego: string;
  titleemprego: string;
  createdAt: string;
  empregoCoverImage?: {
    url: string;
  };
  author: {
    name: string;
  };
}

interface ListaEmpregosProps {
  empregos: Emprego[];
}

export const ListaEmpregos: React.FC<ListaEmpregosProps> = ({ empregos }) => {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {empregos.length > 0 ? (
        empregos.slice(0).map((emprego) => (
          <CardEmprego
            key={emprego.id}
            title={emprego.titleemprego}
            subtitle={emprego.subtitlemprego}
            createdAt={emprego.createdAt}
            urlImage={emprego.empregoCoverImage?.url || '/path/to/default/image.jpg'} // URL de imagem padrão
            slug={emprego.slugemprego}
            author={emprego.author.name}
          />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};
