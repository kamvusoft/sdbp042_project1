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
