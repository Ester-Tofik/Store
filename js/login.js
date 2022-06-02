function login() {
    debugger
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const passwordMangment = document.getElementById("PasswordManager").value;

    if (passwordMangment== '123') {
        sessionStorage.setItem('user', 'manager');
    }
    else {
        sessionStorage.setItem('user', 'customer');
    }
    document.location.href = '../html/store.html';
}

