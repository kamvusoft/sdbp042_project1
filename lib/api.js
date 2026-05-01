export async function getPosts() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await res.json();
        return posts;

    } catch (err) {
        console.error('Error fetching posts:', err);
        return [];
    }
}



export async function createPost(title, body) {
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


export async function updatePost(id, title, body) {
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


export async function deletePost(id) {

    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        });
    } catch (err) {
        console.error('Error deleting post:', err);
    }
}