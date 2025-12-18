// checkboxKikkake.js

export function setupKikkakeCheckboxes(containerId, errorId, inputName = "当財団を知ったきっかけ[]") {
    const container = document.getElementById(containerId);
    const errorElement = document.getElementById(errorId);

    const items = [
        "Instagram", "X(旧Twitter)", "LINE", "Youtube", "TikTok", 
        "インターネット検索","学校のチラシ配布（紙）", "学校のチラシ配布（デジタル）", 
        "学校に貼ってあったポスター等の掲示物",
        "塾に貼ってあったポスター", "塾からのメールやチラシ", 
        "図書館その他公共施設でのポスター等の掲示物", 
        "D&I財団主催イベント", "奨学金情報サイト",
        "ニュースサイト", "新聞", "テレビ", "保護者の紹介",
        "先生の紹介", "友人・知人の紹介",
    ];

    const otherItem = "その他";

    // Fisher–Yatesシャッフル
    // for (let i = items.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [items[i], items[j]] = [items[j], items[i]];
    // }

    // チェックボックスを作成
    function createCheckbox(label, index) {
        const id = "sns" + (index + 1);
        const wrapper = document.createElement("div");
        wrapper.className = "checkbox-wrapper";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = id;
        input.name = inputName;
        input.value = label;

        const inputLabel = document.createElement("label");
        inputLabel.setAttribute("for", id);
        inputLabel.textContent = label;

        wrapper.appendChild(input);
        wrapper.appendChild(inputLabel);
        return wrapper;
    }

    // チェックボックスの追加
    items.forEach((item, idx) => {
        container.appendChild(createCheckbox(item, idx));
    });

    // その他を最後に追加
    container.appendChild(createCheckbox(otherItem, items.length));
}


export function validateKikkakeCheckboxes(errorElementId) {
    const checkboxes = document.querySelectorAll('[name="kikkake[]"]');
    const isChecked = Array.from(checkboxes).some(cb => cb.checked);

    const errorEl = document.getElementById(errorElementId);
    if (!isChecked) {
        if (errorEl) errorEl.style.display = "block";
        return checkboxes[0];
    } else {
        if (errorEl) errorEl.style.display = "none";
        return null;
    }
}

