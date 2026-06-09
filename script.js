// Global functions
function showPage(pageId) {
    document.body.classList.add('page-loading');

    const pages = document.querySelectorAll('.page');
    const currentActive = document.querySelector('.page.active');

    if (currentActive) {
        currentActive.style.opacity = '0';
        currentActive.style.transform = 'translateY(-15px)';

        setTimeout(() => {
            pages.forEach(page => page.classList.remove('active'));

            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');

                if (pageId === 'menu') {
                    setTimeout(() => {
                        // Ensure first tab/category is active on menu open
                        const tabs = document.querySelectorAll('.menu-tab');
                        const cats = document.querySelectorAll('.menu-categories .category');
                        if (tabs.length && cats.length) {
                            tabs.forEach(t => t.classList.remove('active'));
                            cats.forEach(c => c.classList.remove('active-category'));
                            tabs[0].classList.add('active');
                            cats[0].classList.add('active-category');
                            cats[0].querySelectorAll('.menu-item').forEach((item, i) => {
                                item.classList.remove('fade-in');
                                setTimeout(() => item.classList.add('fade-in'), i * 40);
                            });
                        }
                    }, 100);
                }
            }

            document.body.classList.remove('page-loading');
        }, 250);
    } else {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        document.body.classList.remove('page-loading');
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    const clickedLink = Array.from(navLinks).find(link => {
        const onclick = link.getAttribute('onclick');
        return onclick && onclick.includes(`'${pageId}'`);
    });
    if (clickedLink) {
        clickedLink.classList.add('active');
    }

    closeMobileMenu();
    window.scrollTo(0, 0);
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');

    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');

    navLinks.classList.remove('active');
    mobileToggle.classList.remove('active');
}

function openInstagram() {
    window.open('https://www.instagram.com/408boba_sunnyvale?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank');
}

function showCategory(btn, categoryId) {
    document.querySelectorAll('.menu-categories .category').forEach(c => c.classList.remove('active-category'));
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));

    const cat = document.getElementById(categoryId);
    if (cat) {
        cat.classList.add('active-category');
        cat.querySelectorAll('.menu-item').forEach((item, i) => {
            item.classList.remove('fade-in');
            setTimeout(() => item.classList.add('fade-in'), i * 40);
        });
    }
    btn.classList.add('active');
    const menuLayout = document.querySelector('.menu-layout');
    if (menuLayout) {
        const top = menuLayout.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
}

function openOrderLink(platform) {
    const orderLinks = {
        'uber-eats': 'https://www.ubereats.com/store/408-boba/EgqaatNeVE2riY17kqRgQA?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas',
        'doordash': 'https://www.doordash.com/store/408-boba-sunnyvale-34277217/68453950/?rwg_token=ACgRB3eIJAC8efyZMjx5t0G5JJY4LQjhuaRCZ5SOmTIDiCWGDvnlKZeoRWhqm-FIdwdLTl1gXZXesJkW8_9UMiWChRH9i6nu5hoHd-oEqvqxgc5gqoz192I=&utm_campaign=gpa',
        'grubhub': 'https://www.grubhub.com/restaurant/408-boba-1053-e-el-camino-real-sunnyvale/11665032?utm_source=google&utm_medium=organic&utm_campaign=place-action-link&pickup=true&rwg_token=ACgRB3dlEnxpCI1EMsHkt1Iq8aDbrLnhgGlJ1U_ztzQuSFzXDlgebFA0IonKbZ375qk73xMIv2V7ycEkZYPMepTF9SlXecXvkZ2jd-HyohNKJjH3tSoUMCE%3D',
        'postmates': 'https://postmates.com/store/408-boba/EgqaatNeVE2riY17kqRgQA?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas',
        'seamless': 'https://www.seamless.com/menu/408-boba-1053-e-el-camino-real-sunnyvale/11665032?utm_source=google&utm_medium=organic&utm_campaign=place-action-link&pickup=true&rwg_token=ACgRB3cG6o0x79BgTUjOfdAKyarDt8uP_G6kdc9o_UztAOWzabBuG8YvGTvfJjw3bRpTYfwdqTgJKK26hv9YWtauYYJdO7tHR9k6k3hJw9YaaVQp9NJ31iA%3D',
        'caviar': 'https://408boba.dine.online/locations/11665032?utm_source=PAL&utm_medium=organic&utm_campaign=place-action-link&fulfillment=pickup&rwg_token=ACgRB3cm_qJ60FCbfrj03SF47HXHO8HeG5eIkwA_IxDRKcIcxcVy6E9tuISEoF8wBaVZESS2JKI0Kj_z_xWhjYngCrE6_NHR9k6k3hJw9YaaVQp9NJ31iA%3D',
        'custom': 'https://order.online/store/-34277217/?pickup=true&hideModal=true&utm_source=gfo&rwg_token=ACgRB3eDENXXlVLfU6aTTAqoBgJI6q8YY1inPuq991QacXZeOAZy2X-4YwVRj8QZoxVud3SO-eAScbSzRSUjzG4lYMSsYnwtC2kDu8AYczPuC3zRqgnAqsw%3D'
    };

    if (orderLinks[platform]) {
        window.open(orderLinks[platform], '_blank');
    }
}

// Prevent scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});


// DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top on page load
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, 0);

    // Freeze video at first frame
    const heroVid = document.querySelector('.hero-video-background video');
    if (heroVid) {
        heroVid.play().then(() => {
            heroVid.pause();
            heroVid.currentTime = 0;
        }).catch(() => {
            heroVid.currentTime = 0;
        });
    }

    // Initialize first menu category
    const firstCat = document.querySelector('.menu-categories .category');
    if (firstCat) {
        firstCat.classList.add('active-category');
        firstCat.querySelectorAll('.menu-item').forEach((item, i) => {
            setTimeout(() => item.classList.add('fade-in'), i * 40);
        });
    }


    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            } else {
                entry.target.classList.remove('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .section-content, .section-title, .location-grid, .social-section, .contact-card, .menu-header, .category, .menu-item, .page-header, .order-ahead-section, .platform-card').forEach(el => {
        observer.observe(el);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navLinks = document.querySelector('.nav-links');
        const header   = document.querySelector('header');

        if (navLinks.classList.contains('active') && !header.contains(event.target)) {
            closeMobileMenu();
        }
    });
});
