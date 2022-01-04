import React from "react"

//for displaying posts on the right side of App
export default function Preview({currentPost}) {
    return (
        <section className="pane">
           {
               currentPost?
               <div className="preview wrapper">
                   <h1 className="preview--title">Title: {currentPost["title"]}</h1> 
                    <h4 className="preview--author">Author: {currentPost["username"]}</h4>
                    <p>{currentPost["content"]}</p>
               </div>
               :
               <p>Click on a post to preview</p>
           }
        </section>
    )
}