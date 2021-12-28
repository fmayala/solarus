// Error flag
let pwerror = false;
let eerror = false;
let usererror = false;

// Inputs
let pw = document.getElementById('password')
let pwc = document.getElementById('confirmp')
let user = document.getElementById('username')
let email = document.getElementById('email')
let disUsername = document.getElementById('dusername')
let otUsername = document.getElementById('ousername')


// Error elements
let pwE = document.getElementById('pError');
let pwcE = document.getElementById('conPError');
let userE = document.getElementById('uError');
let emailE = document.getElementById('eError');

let emailreg = /^\S+@\S+\.\S+$/
let userreg = /^[a-zA-Z0-9]*[-]?[a-zA-Z0-9]*$/
let passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/

pw.addEventListener('input', (e) => {
  if (!passreg.test(pw.value)) {
    pwE.textContent = 'Please enter a valid password. Your password must contain at least 1 of each of the following: uppercase, lowercase, special, and number character'
    pwerror = true
  } else {
    pwE.textContent = ''
    pwerror = false
  }
})

pwc.addEventListener('input', (e) => {
  if (pwc.value != pw.value) {
    pwcE.textContent = 'Your passwords do not match!'
    pwerror = true
  } else {
    pwcE.textContent = ''
    pwerror = false
  }
})

email.addEventListener('input', (e) => {
  if (!emailreg.test(email.value)) {
    emailE.textContent = 'Please enter a valid email.'
    eerror = true
  } else {
    emailE.textContent = ''
    eerror = false
  }
})

user.addEventListener('input', (e) => {
  if (!userreg.test(user.value) || user.value.length < 4) {
    userE.textContent = 'Please enter a valid username.'
    usererror = true
  } else {
    userE.textContent = ''
    usererror = false
  }
})

/*disUsername.addEventListener('input', (e) => {
  if (e.target.value.length < 1) {
    document.getElementById('discordError').textContent = "Username cannot be empty."
  } else {
    document.getElementById('discordError').textContent = ""
  }
})*/

otUsername.addEventListener('input', (e) => {
  if (e.target.value.length < 1) {
    document.getElementById('onetapError').textContent = "Username cannot be empty."
  } else {
    document.getElementById('onetapError').textContent = ""
  }
})

async function signupJSON(formdata) {
  const response = await fetch('https://api.solarus.club/api/v1/signup', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: formdata // body data type must match "Content-Type" header
  });
  const data = await response.json();
  return data;
}


document.getElementById('submit').addEventListener('click', async (e) => {
  e.preventDefault();


  if (!pwerror && !eerror && !usererror) {
    let formData = new FormData();
    formData.append('username', user.value);
    formData.append('password', pw.value);
    formData.append('email', email.value);
    formData.append('ot_username', otUsername.value)


    const data = await signupJSON(formData);

    if (data.message = 'Successfully signed up.') {
      location.replace("http://localhost:8080/verify?email=" + email.value)
    }

    console.log(data)
  }
})