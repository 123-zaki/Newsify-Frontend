import React from 'react'

export default function LikedPostCard({post}) {
  return (
    <div className={`text-(--text) p-2 bg-(--bg) shadow-sm`}>
        <img src={post.urlToImage ?? "https://images.unsplash.com/photo-1503264116251-35a269479413?blur=80&auto=format&fit=crop&w=800&q=20"} alt="Post Image" className='h-[250px] sm:h-auto max-h-[450px] object-cover w-screen' />
        <h1 className='text-2xl sm:text-3xl font-bold'>{post.title}</h1>
        <p className='sm:text-xl'>{post.description}</p>
    </div>
  )
}
