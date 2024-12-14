const svikiToggle = document.querySelector('.toggle');
const svikiMenu = document.querySelector('.menu');

svikiToggle.addEventListener('click', () => {
    svikiMenu.classList.toggle('active');
});

let svikiLastScroll = 0;
window.addEventListener('scroll', () => {
    const svikiCurrentScroll = window.pageYOffset;
    
    if (svikiCurrentScroll > svikiLastScroll) {
        svikiMenu.classList.remove('active');
    }
    svikiLastScroll = svikiCurrentScroll;
});

const svikiData = [
    "Pantai Kuta, Bali",
    "Gunung Bromo, Jawa Timur",
    "Candi Borobudur, Yogyakarta"
];

const svikiDetails = {
    "Pantai Kuta, Bali": {
        category: "Pantai",
        location: "Bali, Indonesia",
        description: "Nikmati keindahan sunset di pantai terindah di Bali",
        rating: "4.8",
        reviews: "2.5k review",
        price: "Rp 50K",
        image: "https://images.unsplash.com/photo-1663060097347-7be568852b90?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "Gunung Bromo, Jawa Timur": {
        category: "Gunung",
        location: "Jawa Timur",
        description: "Saksikan sunrise spektakuler di kaldera Bromo",
        rating: "4.9",
        reviews: "3.2k review",
        price: "Rp 75K",
        image: "https://images.unsplash.com/photo-1565619109666-b8bfe0e95ceb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "Candi Borobudur, Yogyakarta": {
        category: "Budaya",
        location: "Yogyakarta",
        description: "Kunjungi warisan budaya UNESCO terbesar di dunia",
        rating: "4.9",
        reviews: "5k review",
        price: "Rp 100K",
        image: "https://plus.unsplash.com/premium_photo-1700955004555-900a9733ee14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
};

function svikiBook(button) {
    const icon = button.querySelector('i');
    const span = button.querySelector('span');
    
    if (span.textContent === 'Booking Sekarang') {
        icon.className = 'ri-check-line';
        span.textContent = 'Booking Berhasil';
        button.classList.add('booked');
    } else {
        icon.className = 'ri-calendar-line';
        span.textContent = 'Booking Sekarang';
        button.classList.remove('booked');
    }
}

function svikiScroll(name) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardTitle = card.querySelector('h3').textContent;
        if (cardTitle === name.split(',')[0]) {
            card.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            card.classList.add('highlight');
            setTimeout(() => {
                card.classList.remove('highlight');
            }, 2000);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const svikiSearch = document.querySelector('.search-box input[type="text"]');
    let svikiSuggestions = document.createElement('div');
    svikiSuggestions.className = 'suggestions-box';
    svikiSearch.parentElement.appendChild(svikiSuggestions);

    svikiSearch.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        svikiSuggestions.innerHTML = '';

        if (value.length > 0) {
            const filtered = svikiData.filter(dest => 
                dest.toLowerCase().includes(value)
            );

            if (filtered.length > 0) {
                svikiSuggestions.style.display = 'block';
                filtered.forEach(dest => {
                    const details = svikiDetails[dest];
                    const item = document.createElement('div');
                    item.className = 'suggestion-item';
                    item.innerHTML = `
                        <div class="suggestion-img">
                            <img src="${details.image}" alt="${dest}">
                        </div>
                        <div class="suggestion-content">
                            <div class="suggestion-title">${dest}</div>
                            <div class="suggestion-subtitle">${details.location}</div>
                            <div class="suggestion-details">
                                <span class="badge-small">${details.category}</span>
                                <span class="rating">
                                    <i class="ri-star-fill"></i> 
                                    ${details.rating}
                                </span>
                                <span class="price">${details.price}</span>
                            </div>
                        </div>
                    `;
                    item.addEventListener('click', () => {
                        svikiSearch.value = dest;
                        svikiSuggestions.style.display = 'none';
                        svikiScroll(dest);
                    });
                    svikiSuggestions.appendChild(item);
                });
            } else {
                svikiSuggestions.style.display = 'none';
            }
        } else {
            svikiSuggestions.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!svikiSearch.contains(e.target) && !svikiSuggestions.contains(e.target)) {
            svikiSuggestions.style.display = 'none';
        }
    });

    const svikiForm = document.querySelector('.form');
    const svikiSubmit = document.querySelector('.btn-submit');

    svikiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (svikiSubmit.classList.contains('booked')) {
            svikiSubmit.classList.remove('booked');
            svikiSubmit.innerHTML = `
                <i class="ri-calendar-check-line"></i>
                Pesan Sekarang
            `;
            svikiForm.reset();
        } else {
            const inputs = svikiForm.querySelectorAll('input');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                svikiSubmit.classList.add('booked');
                svikiSubmit.innerHTML = `
                    <i class="ri-check-line"></i>
                    Batalkan Pesanan
                `;
            }
        }
    });

    svikiForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });

    const svikiFilters = document.querySelectorAll('.filter button');
    const svikiCards = document.querySelectorAll('.card');

    svikiFilters.forEach(button => {
        button.addEventListener('click', () => {
            svikiFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.textContent.trim();

            svikiCards.forEach(card => {
                const cardCategory = card.querySelector('.badge-card').textContent;
                
                if (category === 'Semua') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else if (cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});