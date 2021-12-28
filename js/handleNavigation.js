let usinfo = document.getElementById('userInfoBtn')
let subinfo = document.getElementById('subInfoBtn')
let refinfo = document.getElementById('referralInfoBtn')

// Tabs
let userBox = document.getElementById('profile')
let subBox = document.getElementById('subscription')

usinfo.addEventListener('click', (e) => {
    e.target.classList.add('bg-Third')
    subinfo.classList.remove('bg-Third')
    refinfo.classList.remove('bg-Third')

    userBox.classList.remove('hidden')
    subBox.classList.add('hidden')

    location.hash = '#user'
})

subinfo.addEventListener('click', (e) => {
    e.target.classList.add('bg-Third')
    usinfo.classList.remove('bg-Third')
    refinfo.classList.remove('bg-Third')

    userBox.classList.add('hidden')
    subBox.classList.remove('hidden')

    location.hash = "#subscription"
})

refinfo.addEventListener('click', (e) => {
    e.target.classList.add('bg-Third')
    usinfo.classList.remove('bg-Third')
    subinfo.classList.remove('bg-Third')

    userBox.classList.add('hidden')
    subBox.classList.add('hidden')

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