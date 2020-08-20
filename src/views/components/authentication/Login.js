import React, { useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { authorization_base_url, scope, client_id, redirect_url, response_type, } from "../../../core/Constants"
import { retrieveAccessToken } from "../../../core/utils/Utils"
import { saveAccessToken } from "../../../core/user/Actions"
import { useDispatch } from 'react-redux'

export default function Login() {
    const url = `${authorization_base_url}client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope.join("%20")}&response_type=${response_type}`
    const dispatchStore = useDispatch()

    //Save the access token to the store
    const dispatchSaveToken = useCallback(
        (accessToken) => dispatchStore(saveAccessToken(accessToken)),
        [useDispatch()]
    )

    useEffect(() => {
    //    const tokenFromStorage = localStorage.getItem("token")
   //     const expires_at = localStorage.getItem("expires_at")

    }, [])

    useEffect(() => {
        //save the token to the redux store
        let newToken = retrieveAccessToken(window.location.href)
        if (newToken !== "" && newToken !== undefined) {
            dispatchSaveToken(newToken)
        }
    }, [window.location.href]);

    return (
        <Button className="Login" href={url} style={{color:"white"}}> Log in to Spotify</Button>
    );
}