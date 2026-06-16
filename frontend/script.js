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
    let username = document.getElementById("signupUser").value;
    let password = document.getElementById("signupPass").value;

    if (!username || !password) {
        alert("Fill all fields");
        return;
    }

    let user = {
        username,
        password,
        balance: 1000
    };

    localStorage.setItem(username, JSON.stringify(user));

    alert("Signup Successful");
    showLogin();
}

function login() {
    let username = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPass").value;

    let user = JSON.parse(localStorage.getItem(username));

    if (!user || user.password !== password) {
        alert("Invalid Credentials");
        return;
    }

    currentUser = user;

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("atmPage").classList.remove("hidden");

    updateBalance();
}

function updateBalance() {
    document.getElementById("balance").innerText =
        currentUser.balance;
}

function deposit() {
    let amount =
        Number(document.getElementById("amount").value);

    if (amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    currentUser.balance += amount;

    localStorage.setItem(
        currentUser.username,
        JSON.stringify(currentUser)
    );

    updateBalance();

    document.getElementById("amount").value = "";
}

function withdraw() {
    let amount =
        Number(document.getElementById("amount").value);

    if (amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    if (amount > currentUser.balance) {
        alert("Insufficient Balance");
        return;
    }

    currentUser.balance -= amount;

    localStorage.setItem(
        currentUser.username,
        JSON.stringify(currentUser)
    );

    updateBalance();

    document.getElementById("amount").value = "";
}

function logout() {
    currentUser = null;

    document.getElementById("atmPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}