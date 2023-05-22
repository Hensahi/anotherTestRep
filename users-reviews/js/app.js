const USERS_REVIEWS = [
    {
        "foto": "./assets/images/61.jpg",
        "name": "Miguel Perez",
        "review": "Muy buen servicio"
    },
    {
        "foto": "./assets/images/66.jpg",
        "name": "Andres Batista",
        "review": "Excelente comida"
    },
    {
        "foto": "./assets/images/70.jpg",
        "name": "Padre Cardona",
        "review": "No lo recomiendo, precios muy elevados"
    },
    {
        "foto": "./assets/images/88.jpg",
        "name": "Raul Martinez",
        "review": "No me gusto la comida"
    },
]

//Variables globales

const BTN_FORWARD = document.getElementById("btnForward");
const BTN_BACKWARD = document.getElementById("btnBackward");
const BTN_RANDOM = document.getElementById("btnRandom");
const USER_NAME = document.getElementById("userName");
const REVIEW = document.getElementById("review");
const IMAGEN = document.getElementById("picture");


let userReviewIndex = 0;
IMAGEN.setAttribute("src", USERS_REVIEWS[userReviewIndex].foto)
USER_NAME.textContent = USERS_REVIEWS[userReviewIndex].name;
REVIEW.textContent = USERS_REVIEWS[userReviewIndex].review;

BTN_FORWARD.addEventListener("click", () => {

    if (userReviewIndex === (USERS_REVIEWS.length - 1)) {
        userReviewIndex = -1;
    }

    userReviewIndex += 1;
    console.log(userReviewIndex);
    USER_NAME.textContent = USERS_REVIEWS[userReviewIndex].name;
    REVIEW.textContent = USERS_REVIEWS[userReviewIndex].review;
    IMAGEN.setAttribute("src", USERS_REVIEWS[userReviewIndex].foto)


})

BTN_BACKWARD.addEventListener("click", () => {
    if (userReviewIndex <= 0) {
        userReviewIndex = USERS_REVIEWS.length;
        // console.log(userReviewIndex);
    }

    userReviewIndex -= 1;
    console.log(userReviewIndex);

    USER_NAME.textContent = USERS_REVIEWS[userReviewIndex].name;
    REVIEW.textContent = USERS_REVIEWS[userReviewIndex].review;
    IMAGEN.setAttribute("src", USERS_REVIEWS[userReviewIndex].foto)

    // console.log(USERS_REVIEWS.length - 1);
})

BTN_RANDOM.addEventListener("click", () => {
    userReviewIndex = Math.floor(Math.random() * USERS_REVIEWS.length);

    USER_NAME.textContent = USERS_REVIEWS[userReviewIndex].name;
    REVIEW.textContent = USERS_REVIEWS[userReviewIndex].review;
    IMAGEN.setAttribute("src", USERS_REVIEWS[userReviewIndex].foto)

    console.log(userReviewIndex);
})