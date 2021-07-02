import Head from 'next/head'
import Post from '../components/Post'
import {sortByDate} from '../utils'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Home({posts}) {
  return (
    <div>
      <Head>
        <title>Microblog</title>
      </Head>
      <div className='posts'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Get the files from posts directory 
  const files = fs.readdirSync(path.join('posts'))
  
  // Get slug and front matter from posts
  const posts = files.map(filename => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get front matter
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    // console.log(markdownWithMeta);
    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  console.log(posts);

  return {
    props: {
      posts: posts.sort(sortByDate),
    }
  }
}