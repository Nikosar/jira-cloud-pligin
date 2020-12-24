const getSettings = () => AP.context.getToken(
    (token) => fetch("/settings", {
        headers: new Headers({
            'Authorization': `JWT ${token}`
        })
    }).then(resp => resp.json())
        .then(json => console.log(json))
)


getSettings();
