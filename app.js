function Post(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
}

Post.prototype.toDomElement = function() {
    return `
        <div class="post-card">
            <h3>${this.title}</h3>
            <p>${this.body}</p>
        </div>
    `
}

function store() {
    let posts = [];
    let nextId = 1;
    let editingPostId = null;
    let loading = false;

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

    function setEditingPostId(id) {
        editingPostId = id;
    }

    function isPostBeingEdited(id) {
        return editingPostId === id;
    }

    function setLoading(isLoading) {
        loading = isLoading;
        if(loading) {
            document.querySelector('#loadingMessage').classList.remove('hidden');
        } else {
            document.querySelector('#loadingMessage').classList.add('hidden');
        }
    }

    function isLoading() {
        return loading;
    }

    return {
        setPosts,
        addPost,
        getPosts,
        updatePost,
        deletePost,
        getNextId,
        setEditingPostId,
        isPostBeingEdited,
        setLoading,
        isLoading
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



function fillPosts(posts) {

    document.getElementById('formTitle').textContent = 'Edit Post';
    document.getElementById('submitBtn').textContent = 'Update Post';
    document.getElementById('postId').value = post.title;
    document.getElementById('titleInput').value = post.title;
    document.getElementById('bodyInput').value = post.body;
    document.getElementById('cancelBtn').classList.remove('hidden');
}

function clearForm() {
    document.getElementById('formTitle').textContent = 'Add New Post';
    document.getElementById('submitBtn').textContent = 'Add Post';
    document.getElementById('postId').value = '';
    document.getElementById('titleInput').value = '';
    document.getElementById('bodyInput').value = '';
    document.getElementById('cancelBtn').classList.add('hidden');
}
function renderPosts() {
    const postList = document.querySelector('#postsContainer');
    postList.innerHTML = '';
    const postsElements = [];
    postStore.getPosts().forEach(post => {
        postsElements.push(post.toDomElement());
    });
    postList.innerHTML = postsElements.join(' ');
}

async function init() {
    postStore.setLoading(true);
    const loadedPosts = await getPosts();
    postStore.setPosts(loadedPosts.map(post => new Post(post.id, post.title, post.body)));
    renderPosts();
    postStore.setLoading(false);
}

document.addEventListener('DOMContentLoaded', async () => {
    await init();
});
