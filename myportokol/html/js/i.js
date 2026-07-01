// ==========================
// MOBILE SIDEBAR MENU
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");
    const overlay = document.getElementById("overlay");
    const icon = toggle.querySelector("i");

    // Toggle menu saat hamburger diklik
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        overlay.classList.toggle("active");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    // Tutup menu saat overlay diklik
    overlay.addEventListener("click", closeMenu);

    // Tutup menu saat link menu diklik
    document.querySelectorAll("#nav-menu a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    function closeMenu() {
        menu.classList.remove("active");
        overlay.classList.remove("active");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    }
});

// ==========================
// SKILL PROGRESS BAR ANIMATION
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    const fills = document.querySelectorAll(".progress-fill");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.getAttribute("data-percent");
                entry.target.style.width = percent + "%";
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(fill => observer.observe(fill));
});

// ==========================
// CONTACT FORM (FormSubmit AJAX)
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const statusText = document.getElementById("form-status");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const originalBtnText = submitBtn.textContent;

        // Ubah tampilan tombol saat mengirim
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        statusText.textContent = "";
        statusText.className = "";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                statusText.textContent = "Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.";
                statusText.className = "success";
                form.reset();
            } else {
                throw new Error("Gagal mengirim pesan");
            }
        } catch (error) {
            statusText.textContent = "Maaf, pesan gagal terkirim. Coba lagi nanti.";
            statusText.className = "error";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
});