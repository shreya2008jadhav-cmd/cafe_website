// --- 1. Category Filter Engine ---
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active styling from previous buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        menuItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// --- 2. Wishlist Core System Data Layer ---
let wishlist = [];

function toggleWishlist(id, name, price, img) {
    const itemIndex = wishlist.findIndex(item => item.id === id);
    const cardButton = document.querySelector(`#${id} .add-wishlist-btn`);

    if (itemIndex > -1) {
        // Already in wishlist, remove it
        wishlist.splice(itemIndex, 1);
        cardButton.classList.remove('active');
    } else {
        // Add new item
        wishlist.push({ id, name, price, img });
        cardButton.classList.add('active');
    }

    updateWishlistUI();
}

function updateWishlistUI() {
    // Update counts
    document.getElementById('wishlist-count').innerText = wishlist.length;

    const container = document.getElementById('wishlist-items-container');
    container.innerHTML = ''; // Clear context

    if (wishlist.length === 0) {
        container.innerHTML = '<p class="wishlist-empty-msg">Your wishlist is currently empty.</p>';
        return;
    }

    wishlist.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('wishlist-item');
        element.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="wishlist-item-details">
                <h4>${item.name}</h4>
                <span>${item.price}</span>
            </div>
            <button class="remove-from-wishlist-btn" onclick="toggleWishlist('${item.id}', '${item.name}', '${item.price}', '${item.img}')">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        container.appendChild(element);
    });
}

function toggleWishlistSidebar() {
    const sidebar = document.getElementById('wishlist-sidebar');
    sidebar.classList.toggle('open');
}

// --- 3. WhatsApp Redirection Engine ---
function sendmsg() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let msg = document.getElementById('message').value;
    
    let mobilenumber = "9175017069"; 
    
    // Build text format beautifully
    let text = "✨ *New Order/Booking Request* ✨\n\n" + 
               "👤 *Name:* " + name + "\n" +
               "✉️ *Email:* " + email + "\n" +
               "📝 *Message:* " + msg;

    if(wishlist.length > 0) {
        text += "\n\n❤️ *My Wishlist Items:*";
        wishlist.forEach((item, index) => {
            text += `\n ${index + 1}. ${item.name} (${item.price})`;
        });
    }
    
    let url = "https://wa.me/" + mobilenumber + "?text=" + encodeURIComponent(text);
    window.open(url, '_blank');
}