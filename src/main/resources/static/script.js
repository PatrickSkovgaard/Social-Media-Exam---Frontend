
//getPosts()

async function getPosts(){
    const allPosts = await fetch("http://localhost:9090/posts")
    const response = await allPosts.json()
    console.log(response)
}

function postsButtonPressed(){
    const posts = document.getElementById("posts_btn")
    posts.onclick(getPosts())
}
