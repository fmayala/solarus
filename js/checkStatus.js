async function checkJSON() {
    let formData = new FormData();
    formData.append('refresh_token', localStorage.getItem('refresh_token'));

    const response = await fetch('https://api.solarus.club/api/v1/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData // body data type must match "Content-Type" header
    });
    const data = await response.json();
    return data;
}

window.onload = async function () {
    const data = await checkJSON();

    if (data.message == "Unknown error occurred. Could not login.") {
        localStorage.removeItem('username')
        localStorage.removeItem('ot_username')
        localStorage.removeItem('discord_username')
        localStorage.removeItem('uid')
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('idToken')
    }

    if (data.message == "Successfully logged in.") {
        localStorage.setItem('token', data.data.AccessToken)
        //localStorage.setItem('refresh_token', data.data.RefreshToken)
        //localStorage.setItem('idToken', data.data.IdToken)

        if (location.pathname != '/') {
            location.replace("https://solarus.club/profile")
        } else {
            if (location.pathname == "/") {
                let logName = document.getElementById('loggedIn')
                let logLink = document.getElementById('loggedInLink')

                let loginBtn = document.getElementById('loginbtn')
                let signupBtn = document.getElementById('signupbtn')

                async function infoJSON() {
                    let formData = new FormData();
                    formData.append('access_token', localStorage.getItem('token'));

                    const response = await fetch('https://api.solarus.club/api/v1/getuser', {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: formData // body data type must match "Content-Type" header
                    });
                    const data = await response.json();
                    return data;
                }

                let dt = await infoJSON();

                logName.textContent = dt.data.data_username


                logName.classList.remove('hidden')
                logLink.classList.remove('hidden')
                loginBtn.classList.add('hidden')
                signupBtn.classList.add('hidden')
            }

            if (location.pathname == "/profile/") {
                
            }
        }
    } else {
        if (location.pathname == '/') {
            let logName = document.getElementById('loggedIn')
            let logLink = document.getElementById('loggedInLink')

            let loginBtn = document.getElementById('loginbtn')
            let signupBtn = document.getElementById('signupbtn')

            loginBtn.classList.remove('hidden')
            signupBtn.classList.remove('hidden')
            logName.classList.add('hidden')
            logLink.classList.add('hidden')
        }
    }
}