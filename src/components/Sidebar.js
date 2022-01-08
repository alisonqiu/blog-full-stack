import React from "react"
//create a sidebar that, when clicked, set currentPost to the post clicked
export default function Sidebar(props) {
    const postElements = props.posts.map((post) => (
        <div
        onClick={() => props.setCurrentPost(post)}
        className="sidebar--title"
        >
            <h3>{post["title"]}</h3>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>All previous Posts</h3>
            </div>
            {postElements}
        </section>
    )
}
