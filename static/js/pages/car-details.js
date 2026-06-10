document.addEventListener('DOMContentLoaded', function() {
    const CarDetailsPage = {
        init() {
            // === ЭЛЕМЕНТЫ ГАЛЕРЕИ ===
            this.thumbnails = document.querySelectorAll('.thumbnail, .thumbnail-video');
            this.mainImage = document.getElementById('mainImage');
            this.videoContainer = document.getElementById('videoContainer');
            this.videoPlayer = document.getElementById('videoPlayer');

            // === ТАБЫ ===
            this.tabButtons = document.querySelectorAll('.tab-btn');
            this.tabContents = document.querySelectorAll('.tab-content');

            // === НАВИГАЦИЯ ===
            this.navToggle = document.getElementById('navToggle');
            this.navMenu = document.getElementById('navMenu');

            this.initEvents();
        },

        initEvents() {
            // Клик по миниатюрам (фото или видео)
            this.thumbnails.forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchMedia(e.currentTarget);
                });
            });

            // Клик по табам
            this.tabButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.switchTab(e.currentTarget);
                });
            });

            // Мобильное меню
            if (this.navToggle && this.navMenu) {
                this.navToggle.addEventListener('click', () => {
                    this.navToggle.classList.toggle('active');
                    this.navMenu.classList.toggle('active');
                });
            }
        },

        switchMedia(thumbnail) {
            // 1. Обновляем активный класс (теперь работает одинаково для фото и видео)
            this.thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');

            const type = thumbnail.getAttribute('data-type');

            if (type === 'video') {
                // Логика для ВИДЕО
                const rawUrl = thumbnail.getAttribute('data-video');
                const videoUrl = this.formatYouTubeUrl(rawUrl);
                
                if (this.videoPlayer && videoUrl) {
                    this.videoPlayer.src = videoUrl;
                }
                
                if (this.mainImage) this.mainImage.style.display = 'none';
                if (this.videoContainer) this.videoContainer.style.display = 'block';
            } else {
                // Логика для ИЗОБРАЖЕНИЯ
                const fullImgUrl = thumbnail.getAttribute('data-full');
                if (this.mainImage && fullImgUrl) {
                    this.mainImage.src = fullImgUrl;
                    this.mainImage.style.display = 'block';
                }
                
                if (this.videoContainer) this.videoContainer.style.display = 'none';
                if (this.videoPlayer) this.videoPlayer.src = '';
            }
        },

        switchTab(button) {
            const targetTab = button.getAttribute('data-tab');

            this.tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            this.tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.style.display = 'block';
                    content.classList.add('active');
                } else {
                    content.style.display = 'none';
                    content.classList.remove('active');
                }
            });
        },

        // Вспомогательная функция для преобразования ссылки YouTube в формат embed
        formatYouTubeUrl(url) {
            if (!url) return '';
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            const videoId = (match && match[2].length === 11) ? match[2] : null;
            
            return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
        }
    };

    CarDetailsPage.init();
});