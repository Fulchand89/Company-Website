let fpInstance = null;

function initDateRangePicker() {
    const isMobile = window.innerWidth < 768;

    if (fpInstance) fpInstance.destroy();

    fpInstance = flatpickr("#date-range", {
        mode: "range",
        dateFormat: "Y-m-d",
        minDate: "today",
        showMonths: isMobile ? 1 : 2,
        conjunction: " — ",
        ariaLabel: "Shift date range selector",
       onReady: (selectedDates, dateStr, instance) => {
    const cal = instance.calendarContainer;
    const input = document.getElementById("date-range");
    const rect = input.getBoundingClientRect();

    const calendarWidth = 320; // approx width for flatpickr
    const screenWidth = window.innerWidth;

    // Default: open under the input
    let left = rect.left;

    // RIGHT space calculation
    const spaceRight = screenWidth - rect.left;

    // LEFT space calculation
    const spaceLeft = rect.right;

    // 1) If right side DOES NOT have enough space → shift left
    if (spaceRight < calendarWidth) {
        left = rect.right - calendarWidth; 
    }

    // 2) If still outside screen → center it
    if (left < 0) {
        left = (screenWidth - calendarWidth) / 2;
    }

    // Apply final position
    cal.style.position = "absolute";
    cal.style.left = left + "px";
    cal.style.top = rect.bottom + window.scrollY + "px";
}
,
        onChange: (selectedDates, dateStr, instance) => {
            if (selectedDates.length === 2) {
                const duration = (selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24);
                console.log("Selected shift range:", dateStr, `(${duration} days)`); // e.g., validate <7 days for templates
            }
        }
    });
}

initDateRangePicker();
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initDateRangePicker, 250);
});