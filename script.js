document.addEventListener('DOMContentLoaded', () => {
    const riskFill = document.getElementById('riskFill');
    const progressBar = document.getElementById('progress-bar');
    const counter = document.getElementById('panel-counter');
    const panels = document.querySelectorAll('.panel');
    const aiToggle = document.getElementById('ai-toggle');
    const comicImages = document.querySelectorAll('.comic-container img');

    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;

        // Обновляем шкалу риска справа
        if (riskFill) riskFill.style.height = scrollPercent + '%';

        // Синхронный счетчик и прогресс-бар в шапке
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                if (counter) counter.innerText = `Panel ${index + 1} / ${panels.length}`;
                if (progressBar) progressBar.style.width = ((index + 1) / panels.length * 100) + '%';
            }
        });
    });

    // Исправленный ИИ-режим
    if (aiToggle) {
        aiToggle.addEventListener('change', () => {
            comicImages.forEach(img => {
                let currentSrc = img.getAttribute('src');
                if (aiToggle.checked) {
                    if (!currentSrc.includes('_ai.jpg')) {
                        img.src = currentSrc.replace('.jpg', '_ai.jpg');
                    }
                } else {
                    img.src = currentSrc.replace('_ai.jpg', '.jpg');
                }
            });
        });
    }
});

function handleSurvey(ans) {
    document.querySelector('.survey-btns').style.display = 'none';
    document.getElementById('survey-thanks').style.display = 'block';
}
function submitPoll(vote) {
    document.getElementById('poll-box').style.display = 'none';
    document.getElementById('poll-thanks').style.display = 'block';
    console.log("Poll vote:", vote); // Здесь можно настроить отправку данных
}
const openBtn = document.getElementById('open-dev-log');
const closeBtn = document.getElementById('close-dev-log');
const sidebar = document.getElementById('dev-sidebar');
const overlay = document.getElementById('sidebar-overlay');

openBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

[closeBtn, overlay].forEach(el => {
    el.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});
