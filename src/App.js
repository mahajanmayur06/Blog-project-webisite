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

function App() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "My First Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 2,
            title: "My 2nd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 3,
            title: "My 3rd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 4,
            title: "My Fourth Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
      }]);
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult]  = useState([])
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const navigate = useNavigate();

    useEffect (() => {
        const filterPosts = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
            setSearchResult(filterPosts.reverse());
    },[posts, search])

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = {id, title : postTitle, datetime, body : postBody}
        const allPosts = [ ...posts,  newPost]
        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        navigate('/')
    };

    const handleDelete = (id) => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
        navigate('/');
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
