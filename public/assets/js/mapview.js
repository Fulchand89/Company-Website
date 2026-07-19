// map view
const toggleBtn = document.getElementById('toggleCards');
const cardsSection = document.getElementById('cardsSection');
const mapview = document.getElementById('mapview');
const toggleIcon = document.getElementById('toggleIcon');


// -------------------------------
// DESKTOP BEHAVIOUR (>991px)
// -------------------------------
if (window.innerWidth > 991) {

    // DEFAULT: Cards OPEN
    cardsSection.classList.remove('collapsed'); 
    mapview.classList.remove('col-lg-9');
    mapview.classList.add('col-lg-6'); // open view width

    toggleBtn.addEventListener('click', () => {
        const isCollapsed = cardsSection.classList.contains('collapsed');

        if (isCollapsed) {
            // OPEN cards
            cardsSection.classList.remove('collapsed');
            mapview.classList.remove('col-lg-9');
            mapview.classList.add('col-lg-6');
            toggleIcon.style.transform = 'rotate(180deg)';
        } else {
            // CLOSE cards
            cardsSection.classList.add('collapsed');
            mapview.classList.remove('col-lg-6');
            mapview.classList.add('col-lg-9');
            toggleIcon.style.transform = 'rotate(0deg)';
        }

        void cardsSection.offsetHeight;
    });

}


// -------------------------------
// MOBILE BEHAVIOUR (<=991px)
// -------------------------------
if (window.innerWidth <= 991) {

    toggleBtn.style.display = 'none';  // mobile: hide toggle button

    cardsSection.classList.remove('collapsed'); // always open
    mapview.classList.remove('col-lg-9', 'col-lg-6'); // full width
}
