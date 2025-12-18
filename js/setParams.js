// setParams.js

export function autofillFromURL() {
    const params = new URLSearchParams(window.location.search);

    // email の取得と+→%2Bの修正
    let email = params.get('email');
    if (email) {
        email = email.replace(/ /g, "+"); // スペースになってしまった+を元に戻す
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = email;
        }
    }

    // プレエントリーID の取得と埋め込み
    const entryNumber = params.get('entry_number');
    if (entryNumber) {
        const secretInput = document.getElementById('secretID');
        if (secretInput) {
            secretInput.value = entryNumber;
        }
    }
}
