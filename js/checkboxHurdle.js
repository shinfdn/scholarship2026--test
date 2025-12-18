// checkboxHurdle.js

export function setupHurdleCheckboxes(containerId, errorId, inputName = "ハードル[]") {
    const container = document.getElementById(containerId);
    const errorElement = document.getElementById(errorId);

    const items = [
        "理系に進学するための学費が十分にないこと",
        "自分が何をやりたいのか将来像がまだ明確になっていないこと",
        "理数系科目の成績が伸び悩んでいること",
        "周囲に理系に進んだ先輩や進みたい同級生がおらず、情報が少ないこと",
        "親戚、家族などに理系や進みたい分野に進学することを反対されていること",
        "先生や知人、友人、先輩など親以外の第3者から理系以外の分野への進学を勧められていること",
        "居住地の地理的な環境（島嶼部、山間地など）により、交通費や移動時間などの制約があること",
        "就職先のイメージがわいておらず、理系に進むことに不安があること",
        "親が文系大学進学のためイメージがわきづらいこと",
        "親が大学進学していないためイメージがわきづらいこと"
    ];
    
    const otherItem = "上記の中に当てはまるものはない";

    // Fisher–Yatesシャッフル
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    // チェックボックスを作成
    function createCheckbox(label, index) {
        const id = "hurdle" + (index + 1);
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

    const form = document.querySelector("form");
    const checkboxes = Array.from(document.querySelectorAll(`input[name="${inputName}"]`));
    const otherCheckbox = checkboxes.find(cb => cb.value === otherItem);

    // チェック状態変更時の制御ロジック
    form.addEventListener("change", () => {
        const checked = checkboxes.filter(cb => cb.checked);
        const otherChecked = otherCheckbox.checked;

        checkboxes.forEach(cb => {
            if (otherChecked) {
                if (cb !== otherCheckbox) {
                    cb.checked = false;
                    cb.disabled = true;
                } else {
                    cb.disabled = false;
                }
            } else {
                if (cb !== otherCheckbox) {
                    cb.disabled = (checked.length >= 3 && !cb.checked);
                } else {
                    cb.disabled = (checked.length > 0);
                    if (cb.checked && checked.length > 1) {
                        cb.checked = false;
                    }
                }
            }
        });
    });
}

// checkboxHurdle.js
export function validateHurdleCheckboxes(errorElementId) {
    const checkboxes = document.querySelectorAll('[name="hurdle[]"]');
    const isChecked = Array.from(checkboxes).some(cb => cb.checked);

    const errorEl = document.getElementById(errorElementId);
    if (!isChecked) {
        if (errorEl) errorEl.style.display = "block";
        return checkboxes[0];  // 最初のチェックボックスを返す
    } else {
        if (errorEl) errorEl.style.display = "none";
        return null;
    }
}
