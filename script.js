// Project Data
const projectData = {
    'api-gateway': {
        title: 'API Gateway',
        category: 'Backend Infrastructure • Go',
        type: 'laptop',
        description: [
            'A high-performance API gateway written in Go that sits in front of backend services and handles API-key authentication, per-plan rate limiting, response caching, and request analytics in one place, so the services behind it don\'t have to change.',
            'Benchmarked at ~16.7k requests/sec with 0 errors at 500 concurrent clients, adding only ~0.5 ms p50 latency. Load testing exposed upstream connection-pool exhaustion causing 502s under load; fixing it increased throughput 15× and cut p99 latency from 653 ms to 18 ms.',
            'Includes a management API for keys, plans, and live route changes (no restarts), a React + TypeScript dashboard, PostgreSQL-backed analytics written off the request path, and a one-command Docker Compose demo with CI.'
        ],
        images: [
            'images/API-Gateway/overview.png',
            'images/API-Gateway/routes.png',
            'images/API-Gateway/api-keys.png',
            'images/API-Gateway/accounts.png',
            'images/API-Gateway/mobile.png'
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/matiasaldom/API-Gateway' }
        ]
    },
    'foodflow': {
        title: 'FoodFlow',
        category: 'Mobile Application • Non-Profit',
        type: 'phone',
        description: [
            'FoodFlow is a mobile app prototype built for the non-profit Food Link Society to digitize their donated food intake process, cutting data-entry time by an estimated 60% over their previous manual system.',
            'Volunteers log inventory through a fast, accessible intake form, while automated monthly summary reports eliminate manual reporting work for staff and administrators.',
            'Built with Dart, Flutter, Firebase, and Google APIs.'
        ],
        images: [
            'images/foodflow/create_account.png',
            'images/foodflow/dashboard.png',
            'images/foodflow/intake_form.png',
            'images/foodflow/email_summary.png'
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/matiasaldom/foodflow' }
        ]
    },
    'capalation': {
        title: 'Capalation',
        category: 'Mobile Application • Social',
        type: 'phone',
        description: [
            'Capalation is a photo-competition app for friend groups. Members join collections, shoot photos for themed albums, vote for their favourites with a points system, and see the rankings when voting closes.',
            'I architected and built it end to end with React Native (Expo), TypeScript, and Supabase, and shipped it to the App Store (Android is in closed testing). Stripe and RevenueCat power Capalation Plus subscriptions.',
            'Submissions are screened by AI image moderation using Google Cloud Vision, and an internal admin dashboard handles reports, appeals, subscriptions, notifications, and account operations.'
        ],
        images: [
            'images/capalation/feed.jpg',
            'images/capalation/submissions.jpg',
            'images/capalation/voting.jpg',
            'images/capalation/results.jpg',
            'images/capalation/collections.png'
        ],
        links: [
            { label: 'App Store', url: 'https://apps.apple.com/ca/app/capalation/id6772359839' },
            { label: 'Visit Website', url: 'https://capalation.com' }
        ]
    },
    'escay': {
        title: 'Escay',
        category: 'Mobile Application • Lifestyle',
        type: 'phone',
        description: [
            'Escay is a mobile app for planning and sharing date and outing ideas. Users build multi-step itineraries ("Escays") with locations, photos, and descriptions.',
            'Built with Flutter and Supabase, it features a step-based idea builder, saved-ideas collections, and a clean dark-mode interface.',
            'Includes location-based browsing, notifications, and shareable, curated outing plans.'
        ],
        images: [
            'images/Escay/home_screen_escay.png',
            'images/Escay/notification_screen.png',
            'images/Escay/create_screen_escay.png',
            'images/Escay/saved_screen.png'
        ],
        links: []
    },
    'portal': {
        title: 'Pilotfish Portal',
        category: 'Enterprise Web Platform',
        type: 'laptop',
        description: [
            'A secure Microsoft 365 customer portal built during my internship at Pilotfish, giving clients real-time access to their assets, invoices, licenses, and support tickets, reducing manual data requests by ~70%.',
            'Leverages the Microsoft 365 APIs to aggregate licensing data, security scores, and ticketing into a single view.',
            'Paired with automated asset-classification workflows in Rewst that sort hundreds of client devices, cutting operational overhead for the support team.'
        ],
        images: [
            'images/portal/dashboard.png',
            'images/portal/assets.png',
            'images/portal/asset_details.png',
            'images/portal/ticket.png',
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/matiasaldom/Pilotfish-Portal' }
        ]
    }
};

// Initialize Icons
lucide.createIcons();

// Modal Logic
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const slideshow = document.getElementById('modal-slideshow');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalLinks = document.getElementById('modal-links');
const modalDots = document.getElementById('modal-dots');

let currentSlide = 0;
let activeImages = [];

function updateSlideshow() {
    const slides = slideshow.querySelectorAll('.modal-slide');
    const dots = modalDots.querySelectorAll('.dot');
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => {
        d.classList.toggle('bg-black', i === currentSlide);
        d.classList.toggle('w-10', i === currentSlide);
        d.classList.toggle('bg-black/10', i !== currentSlide);
        d.classList.toggle('w-4', i !== currentSlide);
    });
}

document.querySelectorAll('.project-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const id = trigger.getAttribute('data-project');
        const data = projectData[id];
        
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDescription.innerHTML = data.description.map(d => `<p>${d}</p>`).join('');
        
        activeImages = data.images;
        currentSlide = 0;
        
        // Set aspect ratio class based on project type
        slideshow.className = `relative w-full h-full flex items-center justify-center ${data.type === 'phone' ? 'aspect-phone' : 'aspect-laptop'}`;
        
        slideshow.innerHTML = data.images.map((img, i) => `
            <img src="${img}" class="modal-slide ${i === 0 ? 'active' : ''}">
        `).join('');

        modalDots.innerHTML = data.images.map((_, i) => `
            <div class="dot h-2 rounded-full transition-all duration-500 cursor-pointer ${i === 0 ? 'bg-black w-10' : 'bg-black/10 w-4'}" onclick="setSlide(${i})"></div>
        `).join('');

        const links = data.links || [];
        modalLinks.innerHTML = links.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-5 text-black font-black uppercase tracking-[0.3em] text-[10px] hover:gap-8 transition-all group">
                ${link.label} <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-2 transition-transform"></i>
            </a>
        `).join('');
        modalLinks.classList.toggle('hidden', links.length === 0);

        modal.classList.add('active');
        modal.querySelector('.modal-content').scrollTop = 0;
        document.body.style.overflow = 'hidden';

        // Re-render Lucide icons for the freshly injected link arrows
        lucide.createIcons();
    });
    trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger.click();
        }
    });
});

// Close the resume dropdown when clicking anywhere outside it
const resumeMenu = document.querySelector('.resume-menu');
document.addEventListener('click', (e) => {
    if (!resumeMenu.contains(e.target)) resumeMenu.open = false;
});

window.setSlide = (index) => {
    currentSlide = index;
    updateSlideshow();
};

document.getElementById('modal-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentSlide = (currentSlide + 1) % activeImages.length;
    updateSlideshow();
});

document.getElementById('modal-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentSlide = (currentSlide - 1 + activeImages.length) % activeImages.length;
    updateSlideshow();
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modalClose.click();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') resumeMenu.open = false;
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') modalClose.click();
    if (e.key === 'ArrowRight') document.getElementById('modal-next').click();
    if (e.key === 'ArrowLeft') document.getElementById('modal-prev').click();
});