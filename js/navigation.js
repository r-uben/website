document.addEventListener('DOMContentLoaded', (event) => {
    const navButton = document.getElementById('navButton');
    const fixedNav = document.getElementById('fixedNav');
    const header = document.querySelector('.full-header');
    const sections = [header, ...document.querySelectorAll('main section')];
    const navLinks = document.querySelectorAll('.fixed-nav a, .header-content nav a');
    const scrollContainer = document.querySelector('.scroll-container');

    navButton.addEventListener('click', () => {
        fixedNav.classList.toggle('active');
    });

    // Close the nav when a link is clicked
    fixedNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            fixedNav.classList.remove('active');
        });
    });

    // Smooth scroll function
    function smoothScroll(target) {
        scrollContainer.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    }

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = targetId === '#top' ? header : document.querySelector(targetId);
            smoothScroll(targetSection);
        });
    });

    // Highlight active section in navigation
    function highlightActiveSection() {
        let scrollPosition = scrollContainer.scrollTop;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section === header ? 'top' : section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add debouncing to scroll events for better performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    scrollContainer.addEventListener('scroll', debounce(highlightActiveSection, 100));

    let isScrolling = false;
    let scrollTimeout;
    const snapThreshold = 0.8; // Reduced from 0.4 or 0.3

    scrollContainer.addEventListener('wheel', (e) => {
        clearTimeout(scrollTimeout);
        
        if (!isScrolling) {
            scrollContainer.style.scrollBehavior = 'auto';
            scrollContainer.scrollTop += e.deltaY;
        }

        scrollTimeout = setTimeout(() => {
            const currentScroll = scrollContainer.scrollTop;
            const windowHeight = scrollContainer.clientHeight;
            const snapToSection = sections.find((section, index) => {
                const sectionTop = section.offsetTop;
                const distanceToSection = Math.abs(currentScroll - sectionTop);
                return distanceToSection < windowHeight * snapThreshold;
            });

            if (snapToSection) {
                isScrolling = true;
                scrollContainer.style.scrollBehavior = 'smooth';
                smoothScroll(snapToSection);
                setTimeout(() => {
                    isScrolling = false;
                }, 500);
            }
        }, 100);
    });

    // Theme toggling
    function initializeTheme() {
        // Always start with light theme
        document.documentElement.setAttribute('data-theme', 'light');
        
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update favicon
            updateFavicon(newTheme);
            
            // Update toggle button icon
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            // Store the preference
            localStorage.setItem('theme', newTheme);
        });

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    initializeTheme();

    function updateFavicon(theme) {
        const lightSchemeIcon = document.querySelector('link#light-scheme-icon');
        const darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

        if (theme === 'dark') {
            lightSchemeIcon.remove();
            document.head.append(darkSchemeIcon);
        } else {
            darkSchemeIcon.remove();
            document.head.append(lightSchemeIcon);
        }
    }
});