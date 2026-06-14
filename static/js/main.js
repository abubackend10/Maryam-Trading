(function () {
    'use strict';

    const AppState = {
        isMobile: window.innerWidth < 768,
        currentPage: document.body.dataset.page || 'home',

        init() {
            this.detectDevice();
            Navigation.init();
            Animations.init();
            Utils.init();
            this.initPageSpecific();
        },

        detectDevice() {
            window.addEventListener('resize', () => {
                this.isMobile = window.innerWidth < 768;
            });
        },

        initPageSpecific() {
            switch (this.currentPage) {
                case 'home':
                    if (typeof HomePage !== 'undefined') HomePage.init();
                    break;
                case 'gallery':
                    if (typeof CatalogPage !== 'undefined') CatalogPage.init();
                    break;
                case 'car-details':
                    if (typeof CarDetailsPage !== 'undefined') CarDetailsPage.init();
                    break;
                case 'about':
                    if (typeof AboutPage !== 'undefined') AboutPage.init();
                    break;
                case 'contact':
                    if (typeof ContactPage !== 'undefined') ContactPage.init();
                    break;
            }
        }
    };

    const Navigation = {
        navbar: null,
        menuToggle: null,
        menu: null,

        init() {
            this.navbar = document.getElementById('navbar');
            this.menuToggle = document.getElementById('navToggle');
            this.menu = document.getElementById('navMenu');

            if (!this.navbar) return;

            this.bindEvents();
            this.handleScroll();
            this.setActiveLink();
        },

        bindEvents() {
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) return;
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                    this.handleScroll();
                }, 50);
            }, { passive: true });

            if (this.menuToggle) {
                this.menuToggle.addEventListener('click', () => this.toggleMenu());
            }

            document.addEventListener('click', (e) => {
                if (this.menu?.classList.contains('active') &&
                    !e.target.closest('.nav-menu') &&
                    !e.target.closest('.nav-toggle')) {
                    this.closeMenu();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeMenu();
            });
        },

        handleScroll() {
            if (window.scrollY > 50) {
                this.navbar?.classList.add('scrolled');
            } else {
                this.navbar?.classList.remove('scrolled');
            }
        },

        toggleMenu() {
            this.menu?.classList.toggle('active');
            this.menuToggle?.classList.toggle('active');
            document.body.style.overflow =
                this.menu?.classList.contains('active') ? 'hidden' : '';
        },

        closeMenu() {
            this.menu?.classList.remove('active');
            this.menuToggle?.classList.remove('active');
            document.body.style.overflow = '';
        },

        setActiveLink() {
            const currentPath = window.location.pathname;
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                } else if (currentPath === '/' && link.getAttribute('href') === '/') {
                    link.classList.add('active');
                }
            });
        }
    };

    const Animations = {
        init() {
            this.initScrollAnimations();
            this.initCounters();
        },

        initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        },

        initCounters() {
            const counters = document.querySelectorAll('.stat-number[data-count]');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const count = parseInt(target.dataset.count);
                        const duration = 2000;
                        const start = performance.now();

                        function update(currentTime) {
                            const elapsed = currentTime - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const current = Math.floor(progress * count);
                            target.textContent = current.toLocaleString() + '+';
                            if (progress < 1) requestAnimationFrame(update);
                        }

                        requestAnimationFrame(update);
                        observer.unobserve(target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        }
    };

    const Utils = {
        init() {
            this.initLazyLoading();
        },

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i> ${message}`;
            document.body.appendChild(notification);

            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        },

        initLazyLoading() {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');

            const imageObserver = ('IntersectionObserver' in window) ?
                new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            // Переносим data-src в src только если это необходимо
                            if (img.dataset.src && img.src !== img.dataset.src) {
                                img.src = img.dataset.src;
                            }
                            imageObserver.unobserve(img);
                        }
                    });
                }, { rootMargin: '200px' }) : null; // Начинаем загрузку чуть заранее

            lazyImages.forEach(img => {
                // Обработка класса 'loaded' для плавного появления (CSS transition)
                // Используем событие load, так как браузер может отложить загрузку
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
                }

                // Если используется data-src, подключаем наблюдатель
                if (imageObserver && img.dataset.src) {
                    imageObserver.observe(img);
                } else if (!imageObserver && img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        },

        debounce(func, wait) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }
    };

    document.addEventListener('DOMContentLoaded', () => AppState.init());

})();