let schoolData = {};
let selectedPrefCode = "";
let selectedSchoolType = "";

const suggestionList = document.getElementById('suggestionList');
const codeInput = document.getElementById('schoolCode');
const nameInput = document.getElementById('schoolName');
const prefSelect = document.getElementById('prefSelect');
const schoolTypeSelect = document.getElementById('schoolTypeSelect');
const searchWord = document.getElementById('searchWord'); // inputの中身
const kensakuButton = document.getElementById('kensaku'); // 検索ボタン

// 初期状態
suggestionList.setAttribute('data-placeholder', '検索結果がここに表示されます。');

// fetch 成功後にイベントリスナーを追加
fetch("data/schools2.json")
    .then(response => response.json())
    .then(data => {
        schoolData = data;
        schoolTypeSelect.addEventListener('change', resetAndSearchIfKeyword); 
        prefSelect.addEventListener('change', resetAndSearchIfKeyword); 
        kensakuButton.addEventListener('click', onPrefSearchedPushed);
        // suggestionList.addEventListener('click', );
    })
    .catch(error => console.error('学校データの読み込みに失敗しました:', error));

function resetAndSearchIfKeyword() {
    codeInput.value = '';
    nameInput.value = '';
    const keyword = searchWord.value.trim();

    suggestionList.innerHTML = '';
    suggestionList.setAttribute('data-placeholder', '学校名を入力してください。');

    if (keyword) {
        showSuggestions(keyword);
    }
}

function onPrefSearchedPushed() {
    const keyword = searchWord.value.trim();
    
    if (!keyword) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '学校名を入力してください。');
        return;
    }else{
        suggestionList.setAttribute('data-placeholder', '学校名を入力してください。');
        showSuggestions(keyword);
    }
}

function showSuggestions(keyword) {
    suggestionList.innerHTML = '';
    suggestionList.removeAttribute('data-placeholder');

    const results = [];

    // すべての種類、都道府県から検索
    for (const [schoolTypeKey, prefs] of Object.entries(schoolData)) {
        for (const [prefName, schools] of Object.entries(prefs)) {
            schools.forEach(school => {
                if (school.name.includes(keyword)) {
                    results.push({
                        ...school,
                        type: schoolTypeKey,  // ← 学校種別を追加
                        pref: prefName        // ← 都道府県名を追加
                    });
                }
            });
        }
    }

    // 任意のフィルター（選択された場合）
    const filteredResults = results.filter(school => {
        const matchesType = selectedSchoolType ? school.type === selectedSchoolType : true;
        const matchesPref = selectedPrefCode ? school.pref === selectedPrefCode : true;
        return matchesType && matchesPref;
    });

    suggestionList.setAttribute('data-placeholder', '学校名を選択してください。');

    if (filteredResults.length === 0) {
        const li = document.createElement('li');
        li.textContent = '自分の高校が見つからない';
        li.style.cursor = 'pointer';
        li.style.padding = '5px';
        li.style.listStyle = 'none';
        li.addEventListener('click', () => {
            codeInput.value = 'D999999999999';
            nameInput.removeAttribute('readonly');
            nameInput.placeholder = '学校名を入力してください';
            nameInput.style.backgroundColor = '#f0faf7';
            // nameInput.style.color = '#009C7A';
            nameInput.value = '';
            suggestionList.innerHTML = '';
            suggestionList.setAttribute('data-placeholder', '学校名を入力してください。');
        });
        suggestionList.appendChild(li);
    } else {
        filteredResults.forEach(school => {
            const li = document.createElement('li');
            li.textContent = `${school.name}`;
            li.style.cursor = 'pointer';
            li.style.padding = '5px';
            li.style.listStyle = 'none';
            li.addEventListener('click', () => {
                codeInput.value = school.code;
                nameInput.value = school.name;
                suggestionList.innerHTML = '';
                suggestionList.setAttribute('data-placeholder', '検索結果がここに表示されます。');
            });
            suggestionList.appendChild(li);
        });
    }
}

