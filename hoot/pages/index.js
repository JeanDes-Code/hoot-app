import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home({ posts, date }) {
    return (
        <>
            <Head>
                <title>Hoot</title>
                <meta
                    name="description"
                    content="Réseau social pour Nerds exigeants."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Liste d'articles</h1>
            <section>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link href={`/article/${post.id}`}>
                                <a>
                                    <h3>
                                        #{post.id} - {post.title}
                                    </h3>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export async function getServerSideProps() {
    const posts = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=20'
    ).then((r) => r.json())
    return {
        props: {
            posts,
        },
    }
}
