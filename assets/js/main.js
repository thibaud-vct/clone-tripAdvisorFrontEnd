const $ = document;
$.addEventListener("DOMContentLoaded", () => {
    console.log("document loaded");
    let token = "";

    // open and close signup
    $.querySelector(".mobile").addEventListener("click", () => {
        $.querySelector(".burger").classList.toggle("visible");
    });

    // open and close signup
    $.querySelector(".loginBurger").addEventListener("click", () => {
        if (
            $.querySelector(".loginButton").innerHTML === "Connectez-vous" ||
            $.querySelector(".loginBurger").innerHTML === "Connectez-vous"
        ) {
            $.querySelector(".login").classList.add("visible");
        } else {
            token = "";
            $.querySelector(".loginButton").innerHTML = "Connectez-vous";
            $.querySelector(".loginBurger").innerHTML = "Connectez-vous";
        }
    });
    $.querySelector(".loginButton").addEventListener("click", () => {
        if ($.querySelector(".loginButton").innerHTML === "Connectez-vous") {
            $.querySelector(".login").classList.add("visible");
        } else {
            token = "";
            $.querySelector(".loginButton").innerHTML = "Connectez-vous";
            $.querySelector(".loginBurger").innerHTML = "Connectez-vous";
        }
    });
    $.querySelector(".login div span").addEventListener("click", () => {
        $.querySelector(".login").classList.remove("visible");
    });

    // route signup
    $.querySelector("#signup").addEventListener("submit", async (e) => {
        e.preventDefault();
        let password = $.querySelector("#password").value;
        let confirm = $.querySelector("#confirm").value;
        let mail = $.querySelector("#email").value;
        if (new RegExp(mail === /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            $.querySelector("#email").classList.add("valid");
            if (password === confirm) {
                $.querySelector("#password").classList.add("valid");
                $.querySelector("#confirm").classList.add("valid");
                const data = {
                    email: mail,
                    password: password,
                };
                console.log(data);
                const response = await axios.post(
                    "https://app-tripadvisor.herokuapp.com/signup",
                    data
                );
                console.log(response);
                token = response.data.token;
                $.querySelector(".login").classList.remove("visible");
                $.querySelector(".loginButton").innerHTML = "Se déconnecter";
                $.querySelector(".loginBurger").innerHTML = "Se déconnecter";
            } else {
                $.querySelector("#password").classList.add("error");
                $.querySelector("#confirm").classList.add("error");
            }
        } else {
            $.querySelector("#email").classList.add("error");
        }
    });

    // route login
    $.querySelector("#login").addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            email: $.querySelector("#loginEmail").value,
            password: $.querySelector("#loginPassword").value,
        };
        console.log(data);
        const response = await axios.post(
            "https://app-tripadvisor.herokuapp.com/login",
            data
        );
        console.log(response);
        token = response.data.token;
        $.querySelector(".login").classList.remove("visible");
        $.querySelector(".loginButton").innerHTML = "Se déconnecter";
        $.querySelector(".loginBurger").innerHTML = "Se déconnecter";
    });

    // route favorite
    // $.querySelector("#favorite").addEventListener("click", async (e) => {
    //     e.preventDefault();
    //     const data = {
    //         email: $.querySelector("#loginEmail").value,
    //         password: $.querySelector("#loginPassword").value,
    //         token: token,
    //     };
    //     console.log(data);
    //     const response = await axios.post("http://localhost:3000/login", data);
    //     console.log(response);
    //     token = response.data.token;
    // });
});
