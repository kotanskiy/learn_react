import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import "./styles/App.css";


function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description' },
    { id: 2, title: 'Javascript 2', body: 'Description' },
    { id: 3, title: 'Javascript 3', body: 'Description' },
    { id: 4, title: 'Javascript 4', body: 'Description' },
    { id: 5, title: 'Javascript 5', body: 'Description' },
  ])
  const [filter, setFilter] = useState({sortBy: '', query: ''})

  const sortedPosts = useMemo(() => {
    if (filter.sortBy) {
      return [...posts].sort((a, b) => a[filter.sortBy].localeCompare(b[filter.sortBy]))
    } else {
      return posts
    }
  }, [filter.sortBy, posts])

  const sortedSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    if (newPost.title && newPost.body)
      setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <PostList posts={sortedSearchedPosts} remove={removePost} title="List of posts" />
    </div>
  )
}

export default App;
