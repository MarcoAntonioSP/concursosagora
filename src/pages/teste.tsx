import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { gql } from "@apollo/client"
import { format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

import { CardPost } from '@/components/postabertos/CardPost'
import { Header } from '@/components/Header'
import { Empty } from '@/components/Empty'
import { GetServerSideProps } from 'next'
import { client } from '@/lib/apollo'

const GET_ALL_POSTS = gql`
  query MyQuery {
    previstos(orderBy: updatedAt_DESC) {
      id
      author {
        name
        updatedAt
      }
      slugprevisto
      coverImagePrevisto {
        url
      }
      contentPrevisto {
        text
      }
    }
  }
`

interface AllPosts {
  previstos: {
    id: string;
    slugprevisto: string;
    contentPrevisto: {
      text: string;
    }
    coverImagePrevisto: {
      url: string;
    }
    author: {
      name: string;
      updatedAt: string;
    }
  }[]
}

export default function Home ({ previstos }: AllPosts) {
  return (
    <>
      <Head>
        <title>Brasil Concursos</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4'>
        <Header />

        {previstos ?
          <>
            <Link 
              href={`/post/${previstos[0].slugprevisto}`}
              className='w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all'
            >
              <div className='flex flex-1 w-full h-full min-h-[240px] md:min-h-[334px] relative rounded-2xl overflow-hidden'>
                <Image 
                  src={previstos[0].coverImagePrevisto.url}
                  alt=""
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className='flex flex-1 h-full flex-col gap-3 lg:gap-6'>
                <h1 className='font-bold text-3xl md:text-[40px] text-blue-600 line-clamp-2'>{previstos[0].contentPrevisto.text}</h1>
                <p className='text-zinc-600 text-sm md:text-base text-justify lg:text-left line-clamp-3'>{previstos[0].contentPrevisto.text}</p>

                <div>
                  <p className='font-bold text-zinc-900 text-sm md:text-base'>{previstos[0].author.name}</p>
                  <p className='text-zinc-600 text-xs md:text-sm'>{format(new Date(previstos[0].author.updatedAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}</p>
                </div>
              </div>
            </Link>

            <div className='flex flex-col items-center sm:grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 mt-12'>
              {previstos.slice(1, 4).map((post) => (
                <CardPost
                  key={post.id}
                  title={post.contentPrevisto.text}
                  author={post.author.name}
                  createdAt={post.author.updatedAt}
                  subtitle={post.contentPrevisto.text}
                  urlImage={post.coverImagePrevisto.url}
                  slug={post.slugprevisto}
                />
              ))}
            </div>
          </>
          :
          <Empty />
        }
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await client.query({ query: GET_ALL_POSTS })
  return {
    props: {
      previstos: data.previstos,
    }
  }
}
