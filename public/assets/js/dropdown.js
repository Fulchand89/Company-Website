/* ========================================================
   LOCATION DROPDOWN
======================================================== */
document.addEventListener("DOMContentLoaded", function () {

  const locations = [
    "Luxor City",
    "Karnak",
    "West Bank",
    "East Bank",
    "Valley of the Kings",
    "Valley of the Queens",
    "Medinet Habu",
    "Hatshepsut Temple",
    "Luxor Temple",
    "Nile River",
    "Dendera"
];

    const input = document.getElementById("locationInput");

    // Create dropdown dynamically
    const locationDropdown = document.createElement("div");
    locationDropdown.className = "location-dropdown";
    locationDropdown.innerHTML = "<ul></ul>";
    document.body.appendChild(locationDropdown);

    const list = locationDropdown.querySelector("ul");

    function renderList(filter = "") {
        list.innerHTML = "";
        const filtered = locations.filter(loc =>
            loc.toLowerCase().includes(filter.toLowerCase())
        );

        if (!filtered.length) {
            list.innerHTML = `<li style="pointer-events:none;opacity:0.6;">No results</li>`;
            return;
        }

        filtered.forEach(loc => {
            const li = document.createElement("li");
            li.textContent = loc;
            li.onclick = () => {
                input.value = loc;
                locationDropdown.classList.remove("show");
            };
            list.appendChild(li);
        });
    }

    function positionDropdown() {
        const rect = input.getBoundingClientRect();
        const dropdownHeight = locationDropdown.offsetHeight;
        const screenHeight = window.innerHeight;

        locationDropdown.style.width = rect.width + "px";
        locationDropdown.style.left = rect.left + window.scrollX + "px";

        // Check space below
        const spaceBelow = screenHeight - rect.bottom;

        if (spaceBelow < dropdownHeight + 20) {
            // Open ABOVE
            locationDropdown.style.top = (rect.top + window.scrollY - dropdownHeight) + "px";
        } else {
            // Open BELOW
            locationDropdown.style.top = rect.bottom + window.scrollY + "px";
        }
    }

    input.addEventListener("click", () => {
        renderList();
        locationDropdown.classList.add("show");   // show first
        positionDropdown();                       // then calculate height
    });
    input.addEventListener("input", (e) => {
        renderList(e.target.value);
        locationDropdown.classList.add("show");  // make sure it's visible
        positionDropdown();
    });


    document.addEventListener("click", (e) => {
        if (!locationDropdown.contains(e.target) && e.target !== input) {
            locationDropdown.classList.remove("show");
        }
    });

    /* ========================================================
       GUEST DROPDOWN
    ======================================================== */

    const guestDropdown = document.createElement("div");
    guestDropdown.id = "guestDropdown";
    document.body.appendChild(guestDropdown);

    let activeField = null;
    const guestData = new WeakMap();

    function createGuestHTML(a, c, r) {
        return `
    <div class="guest-box">
      <div class="guest-row">
        <label>Adults</label>
        <div class="counter">
          <button class="minus" data-type="adults">-</button>
          <span id="adultsCount">${a}</span>
          <button class="plus" data-type="adults">+</button>
        </div>
      </div>

      <div class="guest-row">
        <label>Children</label>
        <div class="counter">
          <button class="minus" data-type="children">-</button>
          <span id="childrenCount">${c}</span>
          <button class="plus" data-type="children">+</button>
        </div>
      </div>

      <div class="guest-row">
        <label>Rooms</label>
        <div class="counter">
          <button class="minus" data-type="rooms">-</button>
          <span id="roomsCount">${r}</span>
          <button class="plus" data-type="rooms">+</button>
        </div>
      </div>

      <button class="done-btn" id="guestDone">Done</button>
    </div>
  `;
    }

    document.querySelectorAll("[data-guest]").forEach(field => {
        guestData.set(field, { adults: 2, children: 0, rooms: 1 });

        field.addEventListener("click", e => {
            e.stopPropagation();
            activeField = field;

            let { adults, children, rooms } = guestData.get(field);
            guestDropdown.innerHTML = createGuestHTML(adults, children, rooms);

            guestDropdown.classList.add("show");

            const rect = field.getBoundingClientRect();
            const dropdownHeight = guestDropdown.offsetHeight;
            const screenHeight = window.innerHeight;

            // LEFT + WIDTH (same as before)
            guestDropdown.style.left = rect.left + window.scrollX + "px";
            guestDropdown.style.width = rect.width + "px";

            // Space calculation
            const spaceBelow = screenHeight - rect.bottom;

            if (spaceBelow < dropdownHeight + 20) {
                // Open ABOVE
                guestDropdown.style.top = (rect.top + window.scrollY - dropdownHeight) + "px";
            } else {
                // Open BELOW
                guestDropdown.style.top = rect.bottom + window.scrollY + "px";
            }

        });
    });

    guestDropdown.addEventListener("click", e => {
        if (!activeField) return;

        let data = guestData.get(activeField);

        if (e.target.classList.contains("plus")) {
            data[e.target.dataset.type]++;
        }

        if (e.target.classList.contains("minus")) {
            let t = e.target.dataset.type;
            if (t === "adults" && data.adults > 1) data.adults--;
            if (t === "children" && data.children > 0) data.children--;
            if (t === "rooms" && data.rooms > 1) data.rooms--;
        }

        guestDropdown.querySelector("#adultsCount").textContent = data.adults;
        guestDropdown.querySelector("#childrenCount").textContent = data.children;
        guestDropdown.querySelector("#roomsCount").textContent = data.rooms;

        activeField.querySelector("input").value =
            `${data.adults} Adults · ${data.children} Children · ${data.rooms} Rooms`;
    });

    document.addEventListener("click", e => {
        if (!guestDropdown.contains(e.target)) guestDropdown.classList.remove("show");
    });

    document.addEventListener("click", e => {
        if (e.target.id === "guestDone") guestDropdown.classList.remove("show");
    });

}); // DOMContentLoaded







