
let response

getPosts()

async function getPosts(){
    const allPosts = await fetch("http://localhost:9090/posts")
    response = await allPosts.json()
    console.log(response)

    putInHtml(await response)

    return response
}


function putInHtml(posts){

    let emojiDoc = `<p id="emoji_doc">📜</p>`
    let emojiTitle = `<p id="emoji_title">🚩</p>`
    let emojiDate = `<p id="emoji_date">📆</p>`
    let emojiContent = `<p id="emoji_content">💬</p>`
    let emojiHash = `<p id="emoji_hash">#️⃣</p>`

    for (let i = 0; i < posts.length; i++){
        let hashtags = ""
        posts[i].hashtags.forEach(hashtag => {
                hashtags += hashtag.hashWord + " "
        })

        document.getElementById("posts").innerHTML +=
            emojiDoc + `<div class="post_divs">` + emojiTitle + posts[i].postTitle +
            "  " + emojiContent + posts[i].postContent +
            "  " + emojiDate + posts[i].dateCreated +
            "  " + emojiHash + hashtags + `</div>`
    }
}


function displayCreatePost(){

            document.querySelector("#front_page").style.display = "none"
            document.getElementById("create_page").innerHTML = createPageHtml()



}

function createPageHtml(){
    return `
                  <label for="title_post">
                    <input type="text" id="title_post">
                  </label>
                  
                  <label for="content_post">
                    <input type="text" id="content_post">
                  </label>
                  
                  <label for="date_post">
                    <input type="date" id="date_post">
                  </label>
                  
                  
                  <div id="create_accept_btn">
                    <button id="post_creation" onclick="createPost()">Lav post!</button>
                    <button id="cancel_post_creation" onclick="window.location.href='/'">Fortryd</button>
                  </div>
                `
}

async function createPost(){

    const postTitle = document.getElementById("title_post")
    const postContent = document.getElementById("content_post")
    const postDate = document.getElementById("date_post")

    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postTitle: postTitle,
            postContent: postContent,
            postDate: postDate
        })
    }

    console.log("titel: " + postTitle + ", content: " + postContent + ", dato: " + postDate)
    console.log("response er: " + response)

    await fetch("http://localhost:9090/create_post", options)

    setTimeout(()=>{
        returnToFrontPage()
    }, 2000)
}


function returnToFrontPage(){

    document.querySelector("#create_page").style.display = "none"
    document.querySelector("#front_page").style.display = "inherit"

    response = undefined
    getPosts()
}