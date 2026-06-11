document.addEventListener('DOMContentLoaded', function () {
    const CatalogPage = {
        init() {
            this.grid = document.querySelector('.catalog-grid');
            this.filterToggle = document.querySelector('.filter-toggle');
            this.filterRow = document.querySelector('.filter-row');
            this.searchBtn = document.querySelector('.filter-bar .btn-primary');
            this.emptyState = this.createEmptyStateBlock();

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

        createEmptyStateBlock() {
            let block = document.querySelector('.empty-state');
            if (!block && this.grid) {
                block = document.createElement('div');
                block.className = 'empty-state';
                block.style.display = 'none';
                block.style.textAlign = 'center';
                block.style.padding = '40px';
                block.style.gridColumn = '1 / -1';
                block.innerHTML = `
                    <div style="font-size: 50px; color: var(--color-gray); margin-bottom: 15px;"><i class="fa-solid fa-car-burst"></i></div>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить параметры фильтра</p>`;
                this.grid.appendChild(block);
            }
            return block;
        },

        handleSearch() {
            const cards = this.grid.querySelectorAll('.car-card');
            const selects = document.querySelectorAll('.filter-item .form-select');

            const brandFilter = selects[0]?.value.toLowerCase() || '';
            const statusFilter = selects[1]?.value || '';
            const priceFilter = selects[2]?.value || '';

            let visibleCount = 0;

            cards.forEach(card => {
                const cardBrand = card.getAttribute('data-brand')?.toLowerCase() || '';
                const cardStatus = card.getAttribute('data-status') || '';
                const cardPrice = parseInt(card.getAttribute('data-price')) || 0;

                const matchBrand = !brandFilter || cardBrand === brandFilter;
                const matchStatus = !statusFilter || cardStatus === statusFilter;

                let matchPrice = true;
                if (priceFilter) {
                    if (priceFilter.includes('-')) {
                        const [min, max] = priceFilter.split('-').map(Number);
                        matchPrice = cardPrice >= min && (max ? cardPrice <= max : true);
                    } else if (priceFilter.includes('+')) {
                        const min = parseInt(priceFilter);
                        matchPrice = cardPrice >= min;
                    }
                }

                if (matchBrand && matchStatus && matchPrice) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

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