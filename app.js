function Post(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
}

function store() {
    let posts = [];
    let nextId = 1;

    function setPosts(_posts) {
        posts = _posts;
        nextId = posts.length === 0? 1 : Math.max(...posts.map(post => post.id)) + 1;
    }

    function addPost(post) {
        posts.push(post);
        nextId++;
    }

    function getPosts() {
        return posts;
    }

    function updatePost(id, updatedPost) {
        posts = posts.map(post => post.id === id? updatedPost : post);
    }

    function deletePost(id) {
        posts = posts.filter(post => post.id !== id);
    }

    function getNextId() {
        return nextId;
    }

    return {
        setPosts,
        addPost,
        getPosts,
        updatePost,
        deletePost,
        getNextId
    };
}

const postStore = store();

async function getPosts() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await res.json();
        return posts;

    } catch (err) {
        console.error('Error fetching posts:', err);
        return [];
    }
}



async function createPost(title, body) {
    const newPost = { title, body };

    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        const post = await res.json();
        post.id = Date.now(); // Fake ID just so I override the ID that API gives me
        return post;

    } catch (err) {
        console.error('Error creating post:', err);
        return null;
    }
}


async function updatePost(id, title, body) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        });
        const updatedPost = await res.json();
        return updatedPost;
    } catch (err) {
        console.error('Error updating post:', err);
    }


}


async function deletePost(id) {

    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        });
    } catch (err) {
        console.error('Error deleting post:', err);
    }
}
