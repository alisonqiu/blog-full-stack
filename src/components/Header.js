import React from "react"
import troll from "./troll-face.png" 
import image from "./flower.png"
export default function Header() {
    return (
        <header className="header">
            <img 
                src= {image}
                className="header--image"
            />
            <h2 className="header--title">Alison's Blog</h2>
            <h4 className="header--project">Built by Alison Qiu</h4>
        </header>
    )
}