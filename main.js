import { prefectures_file, populatePrefectures } from './js/prefecture.js';
import { setupCharCounter } from './js/charCount.js';
import { setupHurdleCheckboxes } from './js/checkboxHurdle.js';
import { setupKikkakeCheckboxes } from './js/checkboxKikkake.js';
import { autofillFromURL } from './js/setParams.js';
import { validateRequiredFields } from './js/errorHandler.js';

//////////////////
// fetch prefecture from the data
fetch(prefectures_file)
    .then(response => response.json())
    .then(data => {
        populatePrefectures(data);
    })
    .catch(error => console.error('都道府県の取得に失敗しました:', error));

//////////////////
// set email and secretID from URL
window.addEventListener('DOMContentLoaded', () => {
    autofillFromURL();
});

//////////////////
// setup the char counter
document.addEventListener('DOMContentLoaded', () => {
    setupCharCounter();
});

//////////////////
// setup the kikkake checkbox limit and validation
window.addEventListener('DOMContentLoaded', () => {
    setupHurdleCheckboxes('checkbox-container-hurdle', 'checkbox-error-hurdle');
});


//////////////////
// setup the kikkake checkbox limit and validation
window.addEventListener('DOMContentLoaded', () => {
    setupKikkakeCheckboxes('checkbox-container-kikkake', 'checkbox-error-kikkake');
});


//////////////////
// setup the error check
// document.querySelector("form").addEventListener("submit", validateRequiredFields);

document.getElementById("formSubmit").addEventListener("click", (e) => {
    validateRequiredFields(e);
});


