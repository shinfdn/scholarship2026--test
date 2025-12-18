export function setupCharCounter() {
    document.querySelectorAll('textarea').forEach(textarea => {
        const id = textarea.id;
        const counter = document.querySelector(`.charCount[data-for="${id}"]`);

        textarea.addEventListener('input', () => {
            const len = textarea.value.length;
            counter.textContent = len;
            if (len > 200) {
                counter.classList.add('over');
            } else {
                counter.classList.remove('over');
            }
        });
    });
}