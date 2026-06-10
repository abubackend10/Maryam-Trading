document.addEventListener('DOMContentLoaded', function() {
    const CatalogPage = {
        init() {
            this.grid = document.querySelector('.catalog-grid');
            this.filterToggle = document.querySelector('.filter-toggle');
            this.filterRow = document.querySelector('.filter-row');
            this.searchBtn = document.querySelector('.filter-bar .btn-primary');
            
            if (!this.grid) return;

            this.initEvents();
        },

        initEvents() {
            if (this.filterToggle && this.filterRow) {
                this.filterToggle.addEventListener('click', () => {
                    this.filterRow.classList.toggle('active');
                });
            }

            if (this.searchBtn) {
                this.searchBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleSearch();
                });
            }
        },

        handleSearch() {
            const cards = this.grid.querySelectorAll('.car-card');
            const selects = document.querySelectorAll('.filter-item .form-select');
            
            const brandFilter = selects[0]?.value.toLowerCase() || '';
            const priceFilter = selects[2]?.value || '';

            let visibleCount = 0;

            cards.forEach(card => {
                const cardBrand = card.getAttribute('data-brand')?.toLowerCase() || '';
                const cardPrice = parseInt(card.getAttribute('data-price')) || 0;

                const matchBrand = !brandFilter || cardBrand === brandFilter;
                const matchPrice = !priceFilter || cardPrice <= parseInt(priceFilter);

                if (matchBrand && matchPrice) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Показываем сообщение, если ничего не найдено
            const emptyState = this.grid.querySelector('.empty-state');
            if (emptyState) {
                emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
            }
                
            if (window.innerWidth <= 768) {
                this.filterRow.classList.remove('active');
            }
        }
    };

    CatalogPage.init();
});