// prefecture.js
export const prefectures_file = "data/schools2.json";
export let schoolDetailData = {};

export function populatePrefectures(data) {
    const prefectureOrder = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
        "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
        "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
        "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
        "鳥取県", "島根県", "岡山県", "広島県", "山口県",
        "徳島県", "香川県", "愛媛県", "高知県",
        "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
    ];

    const foundPrefectures = new Set();

    for (const category in data) {
        for (const pref in data[category]) {
            foundPrefectures.add(pref);
        }
    }

    const select = document.getElementById("prefSelect");
    select.innerHTML = "";

    // プレースホルダーオプション
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "（任意）都道府県を選択";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);

    // 指定順に都道府県を追加
    prefectureOrder.forEach(pref => {
        if (foundPrefectures.has(pref)) {
            const option = document.createElement("option");
            option.value = pref;
            option.textContent = pref;
            select.appendChild(option);
        }
    });
}
