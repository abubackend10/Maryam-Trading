const ContactPage = {
    init() {
        this.initContactForm();
        this.autoCloseAlerts();
    },

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                let val = this.value.replace(/\D/g, '');
                
                if (!val.startsWith('996')) {
                    if (val.length === 0) {
                        this.value = '+996 ';
                        return;
                    }
                    val = '996' + val;
                }
                
                let localVal = val.substring(3, 12); // Max 9 digits after 996
                let formatted = '+996 ';
                if (localVal.length > 0) {
                    formatted += '(' + localVal.substring(0, 3);
                }
                if (localVal.length >= 4) {
                    formatted += ') ' + localVal.substring(3, 6);
                }
                if (localVal.length >= 7) {
                    formatted += '-' + localVal.substring(6, 9);
                }
                this.value = formatted;
            });
            phoneInput.addEventListener('focus', function() {
                if (this.value === '' || this.value.trim() === '+996') {
                    this.value = '+996 ';
                }
            });
            phoneInput.addEventListener('keydown', function(e) {
                if ((e.key === 'Backspace' || e.key === 'Delete') && this.value.length <= 5) {
                    e.preventDefault();
                }
            });
        }

        form.addEventListener('submit', (e) => {
            const name = form.querySelector('input[name="name"]')?.value.trim();
            const email = form.querySelector('input[name="email"]')?.value.trim();
            const phone = form.querySelector('input[name="phone"]')?.value.trim();
            const message = form.querySelector('textarea[name="message"]')?.value.trim();

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