document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. FITUR DARK MODE (TEMA GELAP / TERANG)
    // ==========================================
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const htmlElement = document.documentElement;

    // Cek setelan terakhir yang disimpan pengguna di browser
    if (localStorage.getItem("theme") === "dark" || 
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        htmlElement.classList.add("dark");
    } else {
        htmlElement.classList.remove("dark");
    }

    // Aksi ketika tombol Dark Mode diklik
    darkModeToggle.addEventListener("click", () => {
        if (htmlElement.classList.contains("dark")) {
            htmlElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            htmlElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    });

    // ==========================================
    // 2. MENU MOBILE INTERAKTIF (HAMBURGER MENU)
    // ==========================================
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    // Buka/tutup menu saat tombol hamburger diklik
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // Tutup menu otomatis saat salah satu link navigasi diklik
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });

    // ==========================================
    // 3. ANIMASI INTERAKTIF SAAT SCROLL (FADE IN UP)
    // ==========================================
    const observerOptions = {
        root: null, // menggunakan viewport browser
        threshold: 0.15, // elemen muncul 15% di layar langsung memicu animasi
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Tambahkan class 'show' untuk memicu animasi CSS/Tailwind
                entry.target.classList.add("show");
                // Stop observe agar animasi hanya berjalan sekali saat scroll pertama
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Daftarkan semua elemen yang memiliki class .scroll-animate ke dalam pemantau scroll
    const animatedElements = document.querySelectorAll(".scroll-animate");
    animatedElements.forEach((element) => scrollObserver.observe(element));

    // ==========================================
    // 4. EFEK NAVBAR SHADOW SAAT DI-SCROLL
    // ==========================================
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shadow-lg", "bg-white/95", "dark:bg-slate-950/95");
            navbar.classList.remove("bg-white/80", "dark:bg-slate-950/80");
        } else {
            navbar.classList.remove("shadow-lg", "bg-white/95", "dark:bg-slate-950/95");
            navbar.classList.add("bg-white/80", "dark:bg-slate-950/80");
        }
    });
});
