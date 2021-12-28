// Inputs
let verify = document.getElementById('verify')

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
  
  
    if (!pwerror && !eerror && !usererror) {
      let formData = new FormData();
      formData.append('username', user.value);
  
  
      fetch('https://api.solarus.club/verify', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData // body data type must match "Content-Type" header
      }).then( data => {
        console.log(data.json); // JSON data parsed by `data.json()` call
      });
    }
  })