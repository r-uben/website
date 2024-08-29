document.addEventListener('DOMContentLoaded', (event) => {
    const navButton = document.getElementById('navButton');
    const fixedNav = document.getElementById('fixedNav');

    navButton.addEventListener('click', () => {
        fixedNav.classList.toggle('active');
    });

    // Close the nav when a link is clicked
    fixedNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            fixedNav.classList.remove('active');
        });
    });
});