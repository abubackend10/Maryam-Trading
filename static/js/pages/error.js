document.addEventListener('DOMContentLoaded', () => {
    const errorSection = document.querySelector('.error-section');
    const errorCode = document.querySelector('.error-code');

    // Параллакс эффект для цифр ошибки только на десктопах
    if (errorSection && errorCode && window.innerWidth > 768) {
        errorSection.addEventListener('mousemove', (e) => {
            // Вычисляем позицию мыши относительно центра экрана
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            
            // Плавный поворот цифр в противоположную сторону
            errorCode.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(30px)`;
        });

        // Сбрасываем транзишн при движении для большей отзывчивости
        errorSection.addEventListener('mouseenter', () => {
            errorCode.style.transition = 'none';
        });

        // Возвращаем в исходное положение при уходе мыши
        errorSection.addEventListener('mouseleave', () => {
            errorCode.style.transition = 'transform 0.5s ease-out';
            errorCode.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)`;
        });
    }
});
