const ContactPage = {
    init() {
        this.initContactForm();
        this.autoCloseAlerts();
    },

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            const name = form.querySelector('input[type="text"]')?.value.trim();
            const email = form.querySelector('input[type="email"]')?.value.trim();
            const phone = form.querySelector('input[type="tel"]')?.value.trim();
            const message = form.querySelector('textarea')?.value.trim();

            if (!name || !email || !phone || !message) {
                e.preventDefault();
                this.showError('Заполните все поля');
                return;
            }

            if (!this.validateEmail(email)) {
                e.preventDefault();
                this.showError('Введите корректный email');
                return;
            }

            if (phone.length < 10) {
                e.preventDefault();
                this.showError('Введите корректный номер телефона');
                return;
            }
        });
    },

    autoCloseAlerts() {
        const alerts = document.querySelectorAll('.alert:not(.initialized)');
        alerts.forEach(alert => {
            alert.classList.add('initialized');
            
           
            const progress = document.createElement('div');
            progress.className = 'toast-progress';
            alert.appendChild(progress);

            setTimeout(() => {
                alert.classList.add('toast-enter');
            }, 50);

            const hideTimeout = setTimeout(() => {
                this.closeAlert(alert);
            }, 5000);

            const closeBtn = alert.querySelector('.alert-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    clearTimeout(hideTimeout);
                    this.closeAlert(alert);
                });
            }
        });
    },

    closeAlert(alert) {
        alert.classList.remove('toast-enter');
        alert.classList.add('toast-exit');
        setTimeout(() => {
            if (alert.parentNode) alert.remove();
        }, 500);
    },

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    showError(message) {
        this.createToast(message, 'error');
    },

    showSuccess(message) {
        this.createToast(message, 'success');
    },

    createToast(message, type) {
        const container = document.querySelector('.messages-container');
        if (!container) return;

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-content">${message}</div>
            <button class="alert-close-btn">&times;</button>
        `;
        container.appendChild(alert);

        const progress = document.createElement('div');
        progress.className = 'toast-progress';
        alert.appendChild(progress);

        setTimeout(() => {
            alert.classList.add('toast-enter');
        }, 50);

        const hideTimeout = setTimeout(() => {
            this.closeAlert(alert);
        }, 5000);

        const closeBtn = alert.querySelector('.alert-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                clearTimeout(hideTimeout);
                this.closeAlert(alert);
            });
        }
    }
};