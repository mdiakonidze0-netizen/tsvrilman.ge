const AGE_VERIFIED_KEY = "tsvrilmani_age_verified";

function checkAge() {

    const verified =
        localStorage.getItem(AGE_VERIFIED_KEY);

    if (verified === "true") {
        return;
    }

    const overlay =
        document.createElement("div");

    overlay.id = "ageVerification";

    overlay.innerHTML = `
        <div class="age-box">

            <h2>
                🔞 ასაკის დადასტურება
            </h2>

            <p>
                ამ ვებსაიტზე შესასვლელად
                უნდა დაადასტურო, რომ ხარ 18 წლის ან უფროსი.
            </p>

            <div class="age-buttons">

                <button id="ageYes">
                    ვარ 18 წლის ან უფროსი
                </button>

                <button id="ageNo">
                    არა
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(overlay);


    document.getElementById("ageYes")
        .addEventListener("click", () => {

            localStorage.setItem(
                AGE_VERIFIED_KEY,
                "true"
            );

            overlay.remove();
        });


    document.getElementById("ageNo")
        .addEventListener("click", () => {

            document.body.innerHTML = `
                <div class="age-denied">

                    <h1>
                        შესვლა შეუძლებელია
                    </h1>

                    <p>
                        ამ ვებსაიტზე შესვლა მხოლოდ
                        18 წლის ან უფროსი ასაკის
                        მომხმარებლებისთვისაა.
                    </p>

                </div>
            `;
        });
}


document.addEventListener(
    "DOMContentLoaded",
    checkAge
);
