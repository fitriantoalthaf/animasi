document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const form = document.getElementById('formKontak');
    const notif = document.getElementById('notifSukses');

    // --- 1. LOGIKA DARK MODE ---
    const checkDark = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    checkDark();

    darkModeBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    });

    // --- 2. SCROLL SPY & NAVBAR BLUR ---
    const onScroll = () => {
        let current = "";
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 160;
            if (scrollPos >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });

        // Logika bayangan navbar saat mulai di-scroll
        if (scrollPos > 20) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // Jalankan sekali di awal untuk cek posisi

    // --- 3. MOBILE MENU TOGGLE ---
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuBtn.innerHTML = isHidden ? 
            '<i class="fa-solid fa-bars-staggered"></i>' : 
            '<i class="fa-solid fa-xmark"></i>';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
        });
    });

    // --- 4. SCROLL ANIMATION LOGIC (Intersection Observer) ---
    const observerOptions = {
        root: null,
        threshold: 0.15, // Elemen muncul setelah 15% areanya masuk layar
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Unobserve jika Anda ingin animasi hanya berjalan sekali saja saat di-scroll down
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll(".scroll-animate").forEach((el) => {
        scrollObserver.observe(el);
    });

    // --- 5. FORM HANDLING ---
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = 'Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                form.reset();
                form.classList.add('hidden');
                notif.classList.remove('hidden');
                setTimeout(() => {
                    notif.classList.add('hidden');
                    form.classList.remove('hidden');
                    btn.innerText = 'Kirim Pesan';
                    btn.disabled = false;
                }, 4000);
            }, 1500);
        });
    }
});
