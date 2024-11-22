import Link from "next/link";
export default function FeaturedArticle() {
  return (
    <div className="w-full m-w max-w-3xl mx-auto mt-10 text-center">
      <Link href="/" className="group">
        <h1 className="font-semibold text-5xl text-gray-800 group-hover:text-blue-500 transition duration-300">
          PM SP publica edital com 2.700 vagas para soldado
        </h1>
      </Link>
    </div>
  );
}
