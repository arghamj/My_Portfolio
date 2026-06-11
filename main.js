document.addEventListener("DOMContentLoaded", () => {
    
    const envBtn = document.getElementById("env-dropdown-btn");
    const envMenu = document.getElementById("env-dropdown-menu");
    const activeIcon = document.getElementById("active-env-icon");
    const activeText = document.getElementById("active-env-text");
    const bodyNode = document.body;

    const envConfig = {
        day: { icon: "fa-solid fa-sun", text: "Day", class: "env-day" },
        evening: { icon: "fa-solid fa-cloud-sun", text: "Evening", class: "env-evening" },
        night: { icon: "fa-solid fa-moon", text: "Night", class: "" }
    };

    if (envBtn && envMenu) {
        envBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = envMenu.classList.toggle("hidden");
            envBtn.setAttribute("aria-expanded", !isHidden);
        });

        document.addEventListener("click", () => {
            envMenu.classList.add("hidden");
            envBtn.setAttribute("aria-expanded", "false");
        });

        document.querySelectorAll("[data-env]").forEach(item => {
            item.addEventListener("click", (e) => {
                const selectedEnv = e.currentTarget.getAttribute("data-env");
                bodyNode.classList.remove("env-day", "env-evening");
                
                if (envConfig[selectedEnv].class) {
                    bodyNode.classList.add(envConfig[selectedEnv].class);
                }
                
                if (activeIcon && activeText) {
                    activeIcon.className = envConfig[selectedEnv].icon;
                    activeText.textContent = envConfig[selectedEnv].text;
                }
            });
        });
    }

    
    const lightToggleBtn = document.getElementById("lights-toggle-switch");
    const lightIcon = document.getElementById("lightbulb-status-icon");

    if (lightToggleBtn && lightIcon) {
        lightToggleBtn.addEventListener("click", () => {
            bodyNode.classList.toggle("lights-on-active");
            const isActive = bodyNode.classList.contains("lights-on-active");
            lightIcon.className = isActive 
                ? "fa-solid fa-lightbulb text-amber-300" 
                : "fa-regular fa-lightbulb text-amber-400";
        });
    }

    
    const greetingEl = document.getElementById("greeting-text");
    if (greetingEl) {
        greetingEl.innerHTML = greetingEl.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    }

    
    if (typeof anime !== "undefined" && greetingEl) {
        const introTimeline = anime.timeline({ easing: 'easeOutElastic(1, .6)', autoplay: true });
        
        introTimeline
        .add({
            targets: '#greeting-text .letter',
            translateY: [-40, 0],
            opacity: [0, 1],
            delay: anime.stagger(60),
            duration: 1000
        })
        .add({
            targets: '#greeting-text .letter',
            translateX: [{ value: -4, duration: 60 }, { value: 4, duration: 60 }, { value: 0, duration: 60 }],
            easing: 'easeInOutSine',
            duration: 300
        })
        .add({
            targets: '#hero-desc',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutQuad'
        }, '-=400')
        .add({
            targets: '#hero-btns',
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 600,
            easing: 'easeOutCubic'
        }, '-=500');
    }

    // 5. Scroll Reveal Intersection Observer Pipeline
    const revealElements = document.querySelectorAll('.reveal-element');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    
    const contactForm = document.getElementById("secure-contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); /

            const data = new FormData(event.target);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            if(submitButton) {
                submitButton.textContent = "Broadcasting Message...";
                submitButton.disabled = true;
            }

    
            fetch(event.target.action, {
                method: event.target.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert("Message broadcasted successfully!");
                    contactForm.reset();
                } else {
                    alert("Oops! Form submission mein koi dikkat aayi. Kripya Formspree URL check karein.");
                }
            })
            .catch(error => {
                alert("Network Error! Kripya internet connection check karein.");
            })
            .finally(() => {
                if(submitButton) {
                    submitButton.textContent = "Send Secure Message";
                    submitButton.disabled = false;
                }
            });
        });
    }

});

