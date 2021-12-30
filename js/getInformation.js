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

async function linkJSON(code) {
    let formData = new FormData();
    formData.append('code', code);
    formData.append('token', localStorage.getItem('discordAccessToken'))
    formData.append('aws_token', localStorage.getItem('token'))

    const response = await fetch('https://api.solarus.club/api/v1/link', {
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

//let dusername = document.getElementById('dusername')
let otusername = document.getElementById('otusername')
let username = document.getElementById('username')
let msince = document.getElementById('membersince')
let uid = document.getElementById('uid')
let us = document.getElementById('topUser')
let role = document.getElementById('role')
let em = document.getElementById('email')

// Initial hash
//location.hash = "#user"

window.onload = async function () {
    const res = await infoJSON();

    console.log(res.data.data_attributes[1].Name)

    if (res.message == "Successfully retrieved user details.") {
        var did = "";
        var avid = "";
        var otuser = "";
        var discuser = ""
        var email = ""

        // Search through keys until discord username is found.
        for (var i = 0; i < res.data.data_attributes.length; i++) {
            if (res.data.data_attributes[i].Name == 'custom:discord_username') {
                discuser = res.data.data_attributes[i].Value
                break;
            }
        }

        // Search through keys until ot username is found.
        for (var i = 0; i < res.data.data_attributes.length; i++) {
            if (res.data.data_attributes[i].Name == 'custom:onetap_username') {
                otusername.textContent = res.data.data_attributes[i].Value
                otuser = res.data.data_attributes[i].Value
                break;
            }
        }

        for (var i = 0; i < res.data.data_attributes.length; i++) {
            if (res.data.data_attributes[i].Name == 'custom:discord_avatar') {
                avid = res.data.data_attributes[i].Value
            }

            if (res.data.data_attributes[i].Name == 'custom:discord_id') {
                did = res.data.data_attributes[i].Value
            }
        }

        for (var i = 0; i < res.data.data_attributes.length; i++) {
            if (res.data.data_attributes[i].Name == 'email') {
                email = res.data.data_attributes[i].Value
                break;
            }
        }



        localStorage.setItem('username', res.data.data_username)
        localStorage.setItem('ot_username', otuser)

        if (res.data.data_attributes[5] == undefined) {
            document.getElementById('discStatus').textContent = 'Not linked.'
            document.getElementById('linkBtn').classList.remove('hidden')
        } else {
            document.getElementById('discStatus').textContent = 'Linked' + ` (${discuser})`
            localStorage.setItem('discord_username', discuser)
        }

        localStorage.setItem('uid', res.data.data_id)

        us.textContent = res.data.data_username
        username.textContent = res.data.data_username
        uid.textContent = res.data.data_id
        role.textContent = res.data.data_role
        em.textContent = email

        if (did != "" && avid != "") {
            document.getElementById('discAvatar').src = 'https://cdn.discordapp.com/avatars/' + did + '/' + avid
        }

        const d = new Date(res.data.data_created);
        msince.textContent = d.toLocaleDateString()

    }

    if (location.search.includes('code') && discuser == "") {
        console.log("hi")
        var c = location.search.split('code=')[1]
        const res = await linkJSON(c)

        if (res.message == "Successfully linked your account.") {
            localStorage.setItem('discordAccessToken', res.data.access_token)
            localStorage.setItem('discordRefreshToken', res.data.refresh_token)
            localStorage.setItem('discordExpiry', res.data.expires_in)

            location.search = ""
        }
    } else {
        location.hash = '#user'
    }
}

document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault()

    localStorage.removeItem('username')
    localStorage.removeItem('ot_username')
    localStorage.removeItem('discord_username')
    localStorage.removeItem('uid')
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('idToken')

    location.replace("https://solarus.club")
})