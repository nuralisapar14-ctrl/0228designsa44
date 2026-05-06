document.addEventListener('DOMContentLoaded', () => {
    // --- ПЕРЕМЕННЫЕ ---
    const panels = document.querySelectorAll('.panel');
    const counter = document.getElementById('panel-counter');
    const progressBar = document.getElementById('progress-bar');
    const aiToggle = document.getElementById('ai-toggle');
    const riskFill = document.getElementById('riskFill');
    
    // Элементы боковой панели (Dev Log)
    const openDev = document.getElementById('open-dev-log');
    const closeDev = document.getElementById('close-dev-log');
    const sidebar = document.getElementById('dev-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    // --- 1. ЛОГИКА СКРОЛЛА (Риск-метр и Прогресс) ---
    window.addEventListener('scroll', () => {
        const totalPanels = panels.length;
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;

        // Обновляем Риск-метр
        if (riskFill) riskFill.style.height = scrollPercent + '%';

        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            
            // Если панель в центре экрана — обновляем счетчик и полоску
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                const currentNum = index + 1;
                if (counter) counter.innerText = `Panel ${currentNum} / ${totalPanels}`;
                if (progressBar) progressBar.style.width = (currentNum / totalPanels * 100) + '%';
            }
        });
    });

    // --- 2. ЛОГИКА AI MODE (Переключение на 16 страниц) ---
    if (aiToggle) {
        aiToggle.addEventListener('change', () => {
            const images = document.querySelectorAll('.panel img');
            images.forEach(img => {
                let src = img.getAttribute('src');
                if (aiToggle.checked) {
                    // page1.jpg -> page1_ai.jpg
                    if (!src.includes('_ai.jpg')) {
                        img.src = src.replace('.jpg', '_ai.jpg');
                    }
                } else {
                    // Возвращаем обычную версию
                    img.src = src.replace('_ai.jpg', '.jpg');
                }
            });
            // Эффект вспышки при переключении
            document.body.style.filter = "brightness(1.5) contrast(1.2)";
            setTimeout(() => { document.body.style.filter = "none"; }, 150);
        });
    }

    // --- 3. ЛОГИКА БОКОВОЙ ПАНЕЛИ (Development Process) ---
    if (openDev && sidebar) {
        openDev.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Запрет скролла под панелью
        });

        const closeSidebar = () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeDev.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);
    }
});
