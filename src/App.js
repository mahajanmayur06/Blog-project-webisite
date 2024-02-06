import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Nav from './Nav';
import About from './About';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';

import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {format} from 'date-fns';
import api from './api/posts'


function App() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult]  = useState([])
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts')
                setPosts(response.data)
            }
            catch(err){
                // Not in the 200 response range
                if (err.response){
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
                else {
                    console.log(`Error ${err.message}`);
                }
            }
        }
        fetchPosts();
    }, [])
    useEffect (() => {
        const filterPosts = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
            setSearchResult(filterPosts.reverse());
    },[posts, search])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = {id, title : postTitle, datetime, body : postBody}
        try{
            const response = await api.post('/posts', newPost)
            const allPosts = [ ...posts,  response.data]
            setPosts(allPosts)
            setPostTitle('')
            setPostBody('')
            navigate('/')
        } catch(err){
            console.log(`Error : ${err.message}`);
        }
    };

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const updatedPost = {id, title : postTitle, datetime, body : postBody}
        try {
            const response = await api.put(`/posts/${id}`);
            setPosts(posts.map(post => post.id === id ? { ...response.data }: post))
            setEditTitle('')
            setEditBody('')
            navigate('/')
        } catch (err){
            console.log(`Error : ${err.message}`);
        }
    }

    const handleDelete = async (id) => {
        try{
            await api.delete(`/posts/${id}`)
            const updatedPosts = posts.filter((post) => post.id !== id);
            setPosts(updatedPosts);
            navigate('/');
        } catch (err){

        }
    };
    
    return (
        <div className="App">
            <Header title='React JS Blogs'/>
            <Nav
                search={search}
                setSearch={setSearch}
            />
            
            <Routes>
                <Route path='/' element={
                    <Home 
                        posts = {searchResult}
                    />
                } />
                <Route path='/post' element={
                    <NewPost 
                        handleSubmit = {handleSubmit}
                        postTitle = {postTitle}
                        setPostTitle = {setPostTitle}
                        postBody = {postBody}
                        setPostBody = {setPostBody}
                    />
                } />
                <Route path='/post/:id' element={
                    <PostPage 
                        posts = {posts}
                        handleDelete={handleDelete}
                    />
                } />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<Missing />} />
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
