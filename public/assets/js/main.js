
document.addEventListener("DOMContentLoaded", function () {
  const dropdownLinks = document.querySelectorAll('.navbar .dropdown-toggle');

  dropdownLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();

        const menu = this.nextElementSibling;

        // agar already open hai → close
        if (menu.classList.contains("show")) {
          menu.classList.remove("show");
        } else {
          // pehle sab close
          document.querySelectorAll(".mega-menu").forEach(el => {
            el.classList.remove("show");
          });
          // current open
          menu.classList.add("show");
        }
      }
    });
  });
});
