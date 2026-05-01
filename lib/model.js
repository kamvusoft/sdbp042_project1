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

export { Post };