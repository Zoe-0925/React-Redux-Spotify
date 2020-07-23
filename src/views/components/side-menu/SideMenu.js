import React from "react";
import history from "../../../core/history"

export default function SideMenu(props) {

    const goToLibrary = () => {
        props.goToLibrary()
    }

    const goToHomepage = () => {
        props.goToHomepage()
    }

    const goToSearch = () => {
        props.goToSearch()
    }

    return (
        <div className="SideMenu">
            <div className="link" >
                <p className="nav-item" onClick={goToHomepage}>Home</p>
            </div>
            <div className="link" >
                <p className="nav-item" onClick={goToSearch}>Search</p>
            </div>
            <div className="link" >
                <p className="nav-item" onClick={goToLibrary}>Your Library</p>
            </div>
            <div className="nav-title">
                PLAYLISTS
            </div>
            <div className="link" >
                <p className="nav-item">Create Playlists</p>
            </div>
        </div>
    )
}