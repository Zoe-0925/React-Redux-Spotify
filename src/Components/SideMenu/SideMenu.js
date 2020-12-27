import React from "react";
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import history from "../history"
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';

export const SideMenuItem = ({ link, label, children }) => (
    <ListItem className="link" button onClick={() => history.push(link)}>
        <ListItemIcon>
            {children}
        </ListItemIcon>
        <ListItemText className="nav-item" primary={label} />
    </ListItem>
)

export default function SideMenu() {

    return (
        <div className="SideMenu">
            <div className="container">
                <SideMenuItem label="Home" link="/Home">
                    <HomeOutlinedIcon className="nav-icon" fontSize='inherit' />
                </SideMenuItem>
                <SideMenuItem label="Search" link="/search">
                    <SearchOutlinedIcon className="nav-icon" fontSize='inherit' />
                </SideMenuItem>
                <SideMenuItem label="Your Library" link="/library">
                    <LibraryMusicOutlinedIcon className="nav-icon" fontSize='inherit' />
                </SideMenuItem>
                <p className="nav-divider" >PLAYLISTS</p>
                <SideMenuItem label="Create Playlist" link="/create-playlist">
                    <AddBoxIcon className="nav-icon" fontSize='inherit' color='inherit' />
                </SideMenuItem>
            </div>
        </div>
    )
}