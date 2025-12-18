// errorHandler.js
import { validateHurdleCheckboxes } from './checkboxHurdle.js';
import { validateKikkakeCheckboxes } from './checkboxKikkake.js';

export function validateRequiredFields(event) {
    event.preventDefault();

    let isValid = true;
    document.querySelectorAll(".error-highlight").forEach(el => el.classList.remove("error-highlight"));

    const requiredFields = document.querySelectorAll("[data-formrun-required]");
    let firstErrorElement = null;

    requiredFields.forEach(field => {
        const isEmpty = !field.value || (field.type === "checkbox" && !field.checked);
        if (isEmpty) {
            if (!firstErrorElement) firstErrorElement = field;
            console.log(field);
            field.classList.add("error-highlight");

            const name = field.getAttribute("name");
            console.log(name);
            const errorEl = document.querySelector(`[data-formrun-show-if-error="${name}"]`);
            if (errorEl) errorEl.style.display = "block";
            isValid = false;
        }
    });

    const hurdleError = validateHurdleCheckboxes("checkbox-error-hurdle");
    const kikkakeError = validateKikkakeCheckboxes("checkbox-error-kikkake");

    if (hurdleError) {
        isValid = false;
        if (!firstErrorElement) firstErrorElement = hurdleError;
    }

    if (kikkakeError) {
        isValid = false;
        if (!firstErrorElement) firstErrorElement = kikkakeError;
    }

    if (isValid) {
        event.target.closest("form").submit();
    } else if (firstErrorElement) {
        firstErrorElement.closest(".form-group")?.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
        });
        firstErrorElement.focus();
    }
}

