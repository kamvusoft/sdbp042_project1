import { Post } from "./lib/model.js";
import { postStore } from "./lib/store.js";
import { getPosts } from "./lib/api.js";

function fillForm(post) {
    document.getElementById('formTitle').textContent = 'Edit Post';
    document.getElementById('submitBtn').textContent = 'Update Post';
    document.getElementById('postId').value = post.id;
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

export function handleSubmitForm(event) {
    event.preventDefault();
    const postId = parseInt(document.getElementById('postId').value);
    const title = document.getElementById('titleInput').value;
    const body = document.getElementById('bodyInput').value;
    let post;
    if(isNaN(postId)) {
        post = new Post(postStore.getNextId(), title, body);
    } else {
        post = new Post(postId, title, body);
    }
    postStore.addPost(post);
    renderPosts();
    clearForm();
}

document.querySelector('#postForm').addEventListener('submit', handleSubmitForm);
document.querySelector('#searchInput').addEventListener('input', (e) => {
    postStore.setSearchText(e.target.value);
    renderPosts();
});

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
