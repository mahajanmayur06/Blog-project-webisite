import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PostPage = ({ posts, handleDelete}) => {
    const { id } = useParams();
    const post = posts.find((post) => (post.id).toString() === id)

    return (
        <main className='PostPage'>
            <article className='post'></article>
            {post && 
                <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    
                    <Link to={`/edit/${post.id}`}>
                        <button className='editButton'>Edit Button</button>
                    </Link>

                    <button onClick={() => handleDelete(post.id)} className='deleteButton' >
                        Delete Post
                    </button>
                </>
            }
            {!post &&
                <>
                    <h2>No post found</h2>
                    <p>
                        <Link to='/'>Link to Homepage</Link>
                    </p>
                </>
            }
        </main>
    );
}

export default PostPage;
