import React, { useEffect } from "react"
import Split from "react-split"
import Preview from "./Preview"
import Sidebar from "./Sidebar"
//import Showdown from "showdown"
//import ReactMde from "react-mde"

export default function Posts() {
    useEffect(()=>{
        getPosts();
    },[])

    useEffect(() => {
        setTimeout(() => {
          // After 3 seconds set the show value to false
          setSuccessPost(false)
        }, 3000)})

    const [allPosts, setAllPosts] = React.useState([])

    const [currentPost, setCurrentPost]= React.useState(allPosts[0]||"")

    const[makeNew,setMakeNew] = React.useState(false)

    const [formData, setFormData] = React.useState(
        {
            title:"",
            username:"",
            content:""
        }
    )

    const [successPost,setSuccessPost] = React.useState(false)
 
    async function getPosts(){
        fetch("https://cloudflare.alisonqiu.workers.dev").then(res => res.json()).then(data => setAllPosts(data))
        console.log(allPosts)
    }

    async function submitPost(event){
        event.preventDefault()
        console.log(`printing formData: ${JSON.stringify({title: formData["title"], username: formData["username"], content: formData["content"]})} which has a typeof $${typeof {title: formData["title"], username: formData["username"], content: formData["content"]}}`,)
        
        const resp = await fetch("https://cloudflare.alisonqiu.workers.dev", 
        { 
            method: 'POST', 
            body: JSON.stringify({title: formData["title"], username: formData["username"], content: formData["content"]}),
            headers: { 'Content-type': 'application/json' }
        }
        ).then(res=>{
            setSuccessPost(prev => !prev)
        }).catch(error => {
            console.error("here's the problem: "+error);
          });
        }


    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            console.log(formData)
            return {
                ...prevFormData,
                [name]: value
            }

        })}

    function makePost(){
        setMakeNew(prevState => !prevState)
        setSuccessPost(false)
    }

      
    return(
       <main className="posts">
           <div className="post--buttons">
                <button
                        onClick={()=>setMakeNew(prevState => {
                            if (prevState == true){
                                prevState = !prevState
                            }
                        })}
                >Homepage</button>
                <button
                        className="post--buttons--makePost"
                        onClick={makePost}
                >Make a post!</button>
           </div>
{
    makeNew 
    ?

    <div className="wrapper">
        <h1>Create a Post</h1>
        <form className="posts--form">
            <input
                type="text"
                placeholder="Title"
                onChange={handleChange}
                name="title"
                value={formData.title}
                className="form-control"
            />
            <br></br>
            <input
                type="text"
                placeholder="Your username"
                onChange={handleChange}
                value={formData.username}
                name = "username"
                className="form-control"
            />
            <br></br>
            
            <textarea
                placeholder="Type your post"
                value = {formData.content}
                cols="80" 
                rows="40"
                onChange={handleChange}
                name="content"
                className="form-control"
            />
             <br></br>
            <button
                className="post--submit"
                onClick={submitPost}
            >Post!</button>
            {successPost && <p>Success!</p>}
        </form>
    </div>

    :
     
    <Split
    sizes={[30, 70]} 
    direction="horizontal" 
    className="split"
    >

    <div className="left--panel">
    <Sidebar 
        posts = {allPosts}
        setCurrentPost = {setCurrentPost}
    />
    </div>
    <div className="right--panel">
        <Preview 
            currentPost={currentPost} 
        />
    </div>
    </Split>

}
       </main>
    )
}