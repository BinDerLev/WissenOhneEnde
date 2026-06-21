const menuUrl = new URL('html/menu.html', document.currentScript.src);

fetch(menuUrl)
    .then(response => response.text())
    .then(html => {
        const placeholder = document.querySelector('.menu-placeholder');
        placeholder.innerHTML = html;

        const isIndex = !location.pathname.includes('/html/');
        placeholder.querySelectorAll('a[href]').forEach(a => {
            const href = a.getAttribute('href');
            if (isIndex && href && !href.includes('index.html')) {
                a.href = 'html/' + href;
            }
        });

        const currentPage = decodeURIComponent(location.pathname.split('/').pop());
        placeholder.querySelectorAll('a[href]').forEach(a => {
            const linkPage = decodeURIComponent(new URL(a.href, location.href).pathname.split('/').pop());
            if (linkPage === currentPage) {
                a.parentElement.classList.add('aktiv');
            }
        });
    });