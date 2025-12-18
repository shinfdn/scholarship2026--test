let schoolData = { high: {}, technical: {} };
let selectedPrefCode = "";
let selectedSchoolType = "high"; // 初期値は高等学校

const suggestionList = document.getElementById('suggestionList');
const codeInput = document.getElementById('schoolCode');
const nameInput = document.getElementById('schoolName');
const prefSelect = document.getElementById('prefSelect');
const schoolTypeSelect = document.getElementById('schoolTypeSelect');
const searchWord = document.getElementById('searchWord'); // inputの中身
const prefSearchButton = document.getElementById('prefSearch'); // 検索ボタン

// 初期状態
suggestionList.setAttribute('data-placeholder', '学校の種類と都道府県を選択してください。');

// fetch 成功後にイベントリスナーを追加
fetch("data/schools2.json")
    .then(response => response.json())
    .then(data => {
        schoolData = data;
        schoolTypeSelect.addEventListener('change', onSchoolTypeChange); 
        prefSelect.addEventListener('change', onPrefChange); 
        prefSearchButton.addEventListener('click', onPrefSearchedPushed); // ← change → click に修正
    })
    .catch(error => console.error('学校データの読み込みに失敗しました:', error));

function onSchoolTypeChange() {
    selectedSchoolType = schoolTypeSelect.value;
    codeInput.value = '';
    nameInput.value = '';

    updatePlaceholder();
}

function onPrefChange() {
    selectedPrefCode = prefSelect.value;
    codeInput.value = '';
    nameInput.value = '';

    updatePlaceholder();
}

function updatePlaceholder() {
    suggestionList.innerHTML = '';

    if (!selectedSchoolType && !selectedPrefCode) {
        suggestionList.setAttribute('data-placeholder', '学校の種類と都道府県を選択してください。');
    } else if (!selectedSchoolType) {
        suggestionList.setAttribute('data-placeholder', '学校の種類を選択してください。');
    } else if (!selectedPrefCode) {
        suggestionList.setAttribute('data-placeholder', '都道府県を選択してください。');
    } else {
        suggestionList.setAttribute('data-placeholder', '学校名を検索してください。');
    }
}

function onPrefSearchedPushed() {
    if (!selectedSchoolType && !selectedPrefCode) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '学校の種類と都道府県を選択してください。');
    } else if (!selectedPrefCode) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '都道府県を選択してください。');
    } else if (!selectedSchoolType) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '学校の種類を選択してください。');
    } else if (!searchWord.value.trim()) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '学校名を検索してください。');
    } else {
        const keyword = searchWord.value.trim();
        showSuggestions(keyword);
    }
}

function showSuggestions(keyword) {
    suggestionList.innerHTML = '';
    suggestionList.removeAttribute('data-placeholder');

    const schoolList = schoolData[selectedSchoolType][selectedPrefCode] || [];

    const results = schoolList.filter(school =>
        school.name.includes(keyword)
    );

    suggestionList.setAttribute('data-placeholder', '所属する学校名を選択してください。');

    if (results.length === 0) {
        // 「自分の高校が見つからない」選択肢
        const li = document.createElement('li');
        li.textContent = '自分の高校が見つからない';
        li.style.cursor = 'pointer';
        li.style.padding = '5px';
        li.style.listStyle = 'none';
        li.addEventListener('click', () => {
            codeInput.value = 'D999999999999';
            nameInput.value = '自分の高校が見つからない';
            suggestionList.innerHTML = '';
            suggestionList.setAttribute('data-placeholder', '学校名を検索してください。');
        });
        suggestionList.appendChild(li);
    } else {
        results.forEach(school => {
            const li = document.createElement('li');
            li.textContent = school.name;
            li.style.cursor = 'pointer';
            li.style.padding = '5px';
            li.style.listStyle = 'none';
            li.addEventListener('click', () => {
                codeInput.value = school.code;
                nameInput.value = school.name;
                suggestionList.innerHTML = '';
                suggestionList.setAttribute('data-placeholder', '所属する学校名を選択してください。');
            });
            suggestionList.appendChild(li);
        });
    }
}
