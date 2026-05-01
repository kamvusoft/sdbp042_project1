function store() {
    let posts = [];
    let nextId = 1;
    let editingPostId = null;
    let loading = false;
    let searchText = '';

    function setPosts(_posts) {
        posts = _posts;
        nextId = posts.length === 0? 1 : Math.max(...posts.map(post => post.id)) + 1;
    }

    function addPost(post) {
        posts.unshift(post);
        nextId++;
    }

    function getPosts() {
        return searchText? posts.filter(post => post.title.includes(searchText)) : posts;
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

    function setSearchText(text) {
        searchText = text;
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
        isLoading,
        setSearchText
    };
}

export const postStore = store();