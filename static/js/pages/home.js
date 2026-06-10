const HomePage = {
    init() {
        this.initSearchForm();
    },
    
    initSearchForm() {
        const searchBtn = document.querySelector('.search-card .btn-primary');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const brand = document.querySelector('.search-card select:nth-child(1)')?.value || '';
                const type = document.querySelector('.search-card select:nth-child(2)')?.value || '';
                const price = document.querySelector('.search-card select:nth-child(3)')?.value || '';
                
                window.location.href = `/gallery?brand=${brand}&type=${type}&price=${price}`;
            });
        }
    }
};