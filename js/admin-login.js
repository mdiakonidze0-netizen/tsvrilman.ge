<!DOCTYPE html>
<html lang="ka">

<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Admin Login — წვრილმანი</title>

    <link
        rel="stylesheet"
        href="css/style.css"
    >
</head>

<body>

<main class="section">

    <div class="admin-login-box">

        <h1>
            👨‍💼 Manager Login
        </h1>

        <p>
            შესვლა მხოლოდ ადმინისტრატორისთვის
        </p>

        <br>

        <form id="adminLoginForm">

            <label>
                ელფოსტა

                <input
                    type="email"
                    id="adminEmail"
                    required
                >
            </label>

            <br>

            <label>
                პაროლი

                <input
                    type="password"
                    id="adminPassword"
                    required
                >
            </label>

            <br>

            <button
                type="submit"
                class="primary-button"
            >
                შესვლა
            </button>

        </form>

        <p id="loginMessage"></p>

    </div>

</main>

<script src="js/admin-login.js"></script>

</body>

</html>
js/admin-login.js
const loginForm =
    document.getElementById("adminLoginForm");

const loginMessage =
    document.getElementById("loginMessage");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                document.getElementById(
                    "adminEmail"
                ).value.trim();

            const password =
                document.getElementById(
                    "adminPassword"
                ).value;


            if (!email || !password) {

                loginMessage.textContent =
                    "გთხოვ, შეავსე ორივე ველი.";

                return;
            }


            /*
             * აქ განზრახ არ ვინახავთ
             * ნამდვილ პაროლს.
             *
             * შემდეგ ეტაპზე ამ ადგილს
             * დავუკავშირებთ რეალურ
             * ავტორიზაციის სისტემას.
             */

            loginMessage.textContent =
                "ავტორიზაციის სისტემა ჯერ დასაკავშირებელია.";

        }
    );
}
