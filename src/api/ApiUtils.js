export const request = (options) => {
    const headers = new Headers({
        "Content-Type": "application/json"
    })

    console.log(localStorage.getItem(AccessToken))
    if (localStorage.getItem(AccessToken)) {
        console.log("appending header")
        headers.append("Authorization", "Bearer " + localStorage.getItem(AccessToken))
    }


    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    console.log(options)
    return fetch(options.url, options)
        .then(response => {
                console.log(response)
                return response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    console.log("Received json: " + json)
                    return json;
                })
            }
        );
}

export const requestWithoutResponse = (options) => {
    const headers = new Headers({
        "Content-Type": "application/json"
    })

    console.log(localStorage.getItem(AccessToken))
    if (localStorage.getItem(AccessToken)) {
        console.log("appending header")
        headers.append("Authorization", "Bearer " + localStorage.getItem(AccessToken))
    }


    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    console.log(options)
    return fetch(options.url, options)
        .then(response => {
                console.log(response)
                if (!response.ok) {
                    return response.json().then(json =>{
                        console.log(json)
                        return Promise.reject(json)
                    })
                    // const body = response.json()
                    // console.log(body)
                    // return Promise.reject(body)
                }
                return response
                // return response.json().then(json => {
                //     if (!response.ok) {
                //         return Promise.reject(json);
                //     }
                //     console.log("Received json: " + json)
                //     return json;
                // })
            }
        );
}

export const ApiBaseUrl = "http://localhost:8080"

export const AccessToken = "accessToken"