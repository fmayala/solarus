let pw = document.getElementById('password')
let user = document.getElementById('username')

async function loginJSON() {
    let formData = new FormData();
    formData.append('username', user.value);
    formData.append('password', pw.value);
    
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

document.getElementById('submit').addEventListener('click', async (e) => {
    e.preventDefault();
    let data = await loginJSON();

    if (data.message == "Unknown error occurred. Could not login.") {
        document.getElementById('loginError').textContent = "Username/Email and Password combination is incorrect.";
    }

    if (data.message == "Successfully logged in.") {
        localStorage.setItem('token', data.data.AccessToken)
        localStorage.setItem('refresh_token', data.data.RefreshToken)
        localStorage.setItem('idToken', data.data.IdToken)

        location.replace("http://localhost:8080/profile")
    }
})