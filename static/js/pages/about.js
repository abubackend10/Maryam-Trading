const AboutPage = {
    init() {
        this.initStatsAnimation();
    },
    
    initStatsAnimation() {
        const stats = document.querySelectorAll('.about-stat-number');
        if (!stats.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseInt(text);
                    
                    if (!isNaN(number)) {
                        const duration = 1500;
                        const start = performance.now();
                        
                        function update(currentTime) {
                            const elapsed = currentTime - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const current = Math.floor(progress * number);
                            target.textContent = current + '+';
                            if (progress < 1) requestAnimationFrame(update);
                        }
                        
                        requestAnimationFrame(update);
                    }
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
};