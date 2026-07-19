// experience luxor section
var luxorSlider = new Swiper(".luxor-slider", {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: false,

    navigation: {
        nextEl: ".luxor-next",
        prevEl: ".luxor-prev",
    },

    breakpoints: {
        1200: { slidesPerView: 5 },
        992: { slidesPerView: 4 },
        768: { slidesPerView: 3 },
        576: { slidesPerView: 2 },
        0: { slidesPerView: 1.2 }
    }
});

// explore  section js

var swiper = new Swiper(".exploreSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,

    breakpoints: {
        576: { slidesPerView: 1.2 },
        768: { slidesPerView: 2.2 },
        992: { slidesPerView: 3.2 }, // <<< 4 full + half
    },

    navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
    },
});

// This will activate floating search bar mode after login
function enableAfterLoginHero() {
    document.body.classList.add("after-login");
}

// This will activate before-login mode
function disableAfterLoginHero() {
    document.body.classList.remove("after-login");
}

// Example:
setTimeout(() => {
    enableAfterLoginHero();
}, 1500);


// card bottomr-rating

var swiper = new Swiper(".bottom-reviewSwiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
}); 

