let usinfo = document.getElementById('userInfoBtn')
let subinfo = document.getElementById('subInfoBtn')
let refinfo = document.getElementById('referralInfoBtn')

// Tabs
let userBox = document.getElementById('profile')
let subBox = document.getElementById('subscription')
let refBox = document.getElementById('referrals')

usinfo.addEventListener('click', (e) => {
    e.target.classList.add('text-Secondary')
    subinfo.classList.remove('text-Secondary')
    refinfo.classList.remove('text-Secondary')

    userBox.classList.remove('hidden')
    refBox.classList.add('hidden')
    subBox.classList.add('hidden')

    location.hash = '#user'
})

subinfo.addEventListener('click', (e) => {
    e.target.classList.add('text-Secondary')
    usinfo.classList.remove('text-Secondary')
    refinfo.classList.remove('text-Secondary')

    userBox.classList.add('hidden')
    refBox.classList.add('hidden')
    subBox.classList.remove('hidden')

    location.hash = "#subscription"
})

refinfo.addEventListener('click', (e) => {
    e.target.classList.add('text-Secondary')
    usinfo.classList.remove('text-Secondary')
    subinfo.classList.remove('text-Secondary')

    userBox.classList.add('hidden')
    subBox.classList.add('hidden')
    refBox.classList.remove('hidden')

    location.hash = "#referrals"
})

// Profile Stuff


// Subscription Stuff

document.getElementById('subSelect').addEventListener('change', (event) => {
    
    if (event.target.value == 1 || event.target.value  == 2) {
        document.getElementById('paymentButton').classList.remove('hidden')
    } else {
        document.getElementById('paymentButton').classList.add('hidden')
    }

});