let currentUser = null;

function showLogin() {
    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}

function showSignup() {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("signupPage").classList.remove("hidden");
}

function signup() {
    fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: signupUser.value,
            password: signupPass.value,
            balance: 1000
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        showLogin();
    });
}

function login() {
    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: loginUser.value,
            password: loginPass.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.user) {
            alert("Invalid login");
            return;
        }

        currentUser = data.user;

        loginPage.classList.add("hidden");
        atmPage.classList.remove("hidden");

        balance.innerText = currentUser.balance;
    });
}

function updateBalance() {
    document.getElementById("balance").innerText =
        currentUser.balance;
}

function deposit() {
    fetch("http://localhost:5000/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: currentUser.username,
            amount: Number(amount.value)
        })
    })
    .then(res => res.json())
    .then(data => {
        currentUser.balance = data.balance;
        balance.innerText = data.balance;
        amount.value = "";
    });
}
function withdraw() {
    fetch("http://localhost:5000/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: currentUser.username,
            amount: Number(amount.value)
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }

        currentUser.balance = data.balance;
        balance.innerText = data.balance;
        amount.value = "";
    });
}

function logout() {
    currentUser = null;

    document.getElementById("atmPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}