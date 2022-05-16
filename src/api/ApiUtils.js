export const request = (options) => {
    return doFetch(options)
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
    return doFetch(options)
        .then(response => {
                console.log(response)
                if (!response.ok) {
                    return response.json().then(json =>{
                        console.log(json)
                        return Promise.reject(json)
                    })
                }
                return response
            }
        );
}

const doFetch = (options) => {
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
}

export const ApiBaseUrl = process.env.REACT_APP_API_BASE_URL

export const AccessToken = "accessToken"