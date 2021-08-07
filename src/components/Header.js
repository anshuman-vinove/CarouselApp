import React from 'react'

export default function header() {
    return (
        <div>
            <nav className="navbar navbar-dark bg-danger rounded mx-2">
            <div className="container">
                <a className="navbar-brand" href="#">
                <img className='mx-2' src="logo-main.png" alt="logo" width="50px" height="40px"/>
                The Slideshow App
                </a>
            </div>
            </nav>
        </div>
    )
}
