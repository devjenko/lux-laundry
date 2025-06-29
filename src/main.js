window.changeLanguage = changeLanguage;

let languageButton = document.getElementById('language-button');






function changeLanguage(lang) {
 // Toggle the name on every click
    if (languageButton.textContent === 'EN') {
        languageButton.textContent = 'KH';
        // Translate to Khmer using Google Translate URL
        const currentUrl = encodeURIComponent(window.location.href);
        const translateUrl = `https://translate.google.com/translate?sl=en&tl=km&u=${currentUrl}`;
        window.location.href = translateUrl;
    } else {
        languageButton.textContent = 'EN';
        // Reload or go back to the original
        if (window.location.href.includes('translate.google.com')) {
            const urlParams = new URLSearchParams(window.location.search);
            const originalUrl = urlParams.get('u');
            if (originalUrl) {
                window.location.href = decodeURIComponent(originalUrl);
            } else {
                window.location.reload();
            }
        }
    }
    
}