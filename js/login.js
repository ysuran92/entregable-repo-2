var googleUser = {};

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
    console.log(error);
}


function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}


function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            document.getElementById('name').innerText = "Signed in: " +
                googleUser.getBasicProfile().getName();
        },
        function(error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}

(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    let logInAny = () => {
        let inputEmail = document.getElementById("inputEmail");
        let validationCustomUsername = document.getElementById("validationCustomUsername");
        let camposCompletos = true;
        let invalidEmail = document.getElementById("invalidEmail");
        let invalidPass = document.getElementById("invalidPass");
        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
            invalidEmail.style.display = "block";
        }

        if (!(inputEmail.value === '')) {
            invalidEmail.style.display = "none";
        }

        if (validationCustomUsername.value === '') {
            validationCustomUsername.classList.add("invalid");
            camposCompletos = false;
            invalidPass.style.display = "block";
        }

        if (!(validationCustomUsername.value === '')) {
            invalidPass.style.display = "none";
        }
        if (camposCompletos) {

            localStorage.setItem("User-Logged", JSON.stringify({ email: inputEmail.value }));
            window.location = "cover.html";

        };
    };
    document.getElementById("submitBtn").addEventListener("click", function(e) {
        logInAny();
    });
    document.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            logInAny();
        };
    });
});