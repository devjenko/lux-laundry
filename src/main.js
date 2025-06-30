window.changeLanguage = changeLanguage;

let languageButton = document.getElementById('language-button');
let currentLanguage = 'en';

function changeLanguage() {
    const select = document.querySelector('.goog-te-combo');
    if (!select) return;

    if (currentLanguage === 'en') {
        languageButton.textContent = 'KH';
        select.value = ''; // force reset
        select.dispatchEvent(new Event('change'));
        setTimeout(() => {
            select.value = 'km';
            select.dispatchEvent(new Event('change'));
            currentLanguage = 'km';
        }, 100);
    } else {
        languageButton.textContent = 'EN';
        select.value = ''; // force reset
        select.dispatchEvent(new Event('change'));
        setTimeout(() => {
            select.value = 'en';
            select.dispatchEvent(new Event('change'));
            currentLanguage = 'en';
        }, 100);
    }
}