import React, { useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'
import { authorization_base_url, scope, client_id, redirect_url, response_type, } from "../../core/Constants"
import { retrieveAccessToken } from "../../core/utils/Utils"
import { saveAccessToken } from "../../core/user/Actions"

export default function Login({ setShow }) {
    const url = `${authorization_base_url}client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope.join("%20")}&response_type=${response_type}`
    const dispatchStore = useDispatch()

    //Save the access token to the store
    const dispatchSaveToken = useCallback(
        (accessToken) => dispatchStore(saveAccessToken(accessToken)),
        [useDispatch()]
    )

    useEffect(() => {
        //save the token to the redux store
        let newToken = retrieveAccessToken(window.location.href)
        if (newToken !== "" && newToken !== undefined) {
       
            dispatchSaveToken(newToken)
        }
    }, [window.location.href]);

    return (
        <div class="container">
            <img className="background" src={require("./4.jpg")} alt="background"></img>
            <Button className="Login" href={url}
                style={{ color: "white", fontSize: "3rem", backgroundColor: "#0a0a0a" }}>
                Log in to Spotify</Button>
        </div>
    );
}