const logOut = () => {

    sessionStorage.setItem('displayName', null);
    sessionStorage.setItem('email', null);
    sessionStorage.setItem('uid', null);

    window.location.href = "../views/log_out_view.html";

};