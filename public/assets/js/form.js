// Password toggle
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');
document.addEventListener("DOMContentLoaded", () => {

    const toggles = document.querySelectorAll(".toggle-password");

    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const parent = toggle.closest(".position-relative");
            const input = parent.querySelector(".password-field");

            if (input) {
                const type = input.getAttribute("type") === "password" ? "text" : "password";
                input.setAttribute("type", type);

                // Icon toggle
                toggle.classList.toggle("fa-eye");
                toggle.classList.toggle("fa-eye-slash");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".otp-box");

    inputs.forEach((input, index) => {

        // Input event: allow only numbers and move to next
        input.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "");
            e.target.value = value;

            // If user pasted multiple digits, spread them
            if (value.length > 1) {
                value.split("").forEach((char, i) => {
                    if (index + i < inputs.length) {
                        inputs[index + i].value = char;
                    }
                });
                const nextIndex = index + value.length < inputs.length ? index + value.length : inputs.length - 1;
                inputs[nextIndex].focus();
                return;
            }

            // Move to next input if single digit entered
            if (value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        // Keydown: handle backspace and arrow navigation
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }

            if (e.key === "ArrowLeft" && index > 0) {
                inputs[index - 1].focus();
            }

            if (e.key === "ArrowRight" && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        // Focus: auto select
        input.addEventListener("focus", (e) => {
            e.target.select();
        });

        // Paste event: handle multiple digits
        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const pasteData = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "");
            pasteData.split("").forEach((char, i) => {
                if (index + i < inputs.length) {
                    inputs[index + i].value = char;
                }
            });
            const nextIndex = index + pasteData.length < inputs.length ? index + pasteData.length : inputs.length - 1;
            inputs[nextIndex].focus();
        });

    });
});