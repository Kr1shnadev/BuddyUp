// User Profile
const userProfile = {
    name: 'Alex',
    age: 28,
    bio: 'Looking for buddies with similar interests in food, coding, gaming, fitness, music, and travel.',
    interests: ['FPS Games', 'Web Development', 'Italian Cuisine', 'Yoga', 'Rock', 'Adventure Travel'],
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    location: 'San Francisco',
    skill: 'Advanced',
    playTime: 'Evenings & Weekends',
    personality: 'Friendly'
};

// Sample Buddy Profiles
const buddies = [
    {
        id: 1,
        name: 'Sarah',
        age: 24,
        bio: 'Casual gamer who enjoys team-based games and cooking Italian food on weekends.',
        interests: ['FPS Games', 'MOBA Games', 'Streaming', 'Cosplay', 'Italian Cuisine', 'Baking'],
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        location: 'Los Angeles',
        skill: 'Intermediate',
        playTime: 'Weekends',
        personality: 'Friendly'
    },
    {
        id: 2,
        name: 'Mike',
        age: 30,
        bio: 'Competitive player looking for serious teammates. Also a web developer who loves hackathons.',
        interests: ['FPS Games', 'eSports', 'Strategy Games', 'Web Development', 'JavaScript', 'Hackathons'],
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        location: 'New York',
        skill: 'Advanced',
        playTime: 'Evenings',
        personality: 'Competitive'
    },
    {
        id: 3,
        name: 'Emma',
        age: 22,
        bio: 'Streamer and content creator. Love RPGs and cooking streams. Fitness enthusiast.',
        interests: ['RPG Games', 'Streaming', 'Game Development', 'Yoga', 'Running', 'Nutrition'],
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        location: 'Chicago',
        skill: 'Intermediate',
        playTime: 'Flexible',
        personality: 'Creative'
    },
    {
        id: 4,
        name: 'David',
        age: 27,
        bio: 'Game developer by day, musician by night. Looking for creative gaming partners.',
        interests: ['Game Development', 'Casual Games', 'Rock', 'Production', 'Instruments', 'JavaScript'],
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        location: 'Seattle',
        skill: 'Advanced',
        playTime: 'Nights',
        personality: 'Creative'
    },
    {
        id: 5,
        name: 'Olivia',
        age: 25,
        bio: 'Travel vlogger who games on the go. Love exploring new places and meeting new people.',
        interests: ['Casual Games', 'Photography', 'Travel', 'Adventure Travel', 'Food Tourism', 'Cultural Experiences'],
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
        location: 'Austin',
        skill: 'Beginner',
        playTime: 'Weekends',
        personality: 'Adventurous'
    },
    {
        id: 6,
        name: 'James',
        age: 29,
        bio: 'Data scientist and machine learning enthusiast. Enjoys strategy games and coffee.',
        interests: ['Strategy Games', 'Data Science', 'Machine Learning', 'Python', 'Coffee', 'Chess'],
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        location: 'San Francisco',
        skill: 'Advanced',
        playTime: 'Evenings',
        personality: 'Analytical'
    },
    {
        id: 7,
        name: 'Sophia',
        age: 26,
        bio: 'Fitness coach and casual gamer. Looking for workout buddies and gaming friends.',
        interests: ['Casual Games', 'Weightlifting', 'Nutrition', 'Team Sports', 'Hiking', 'Yoga'],
        image: 'https://randomuser.me/api/portraits/women/7.jpg',
        location: 'Denver',
        skill: 'Intermediate',
        playTime: 'Mornings',
        personality: 'Energetic'
    },
    {
        id: 8,
        name: 'Daniel',
        age: 31,
        bio: 'Professional chef and foodie. Enjoys cooking streams and food photography.',
        interests: ['Streaming', 'Italian Cuisine', 'Asian Cuisine', 'BBQ', 'Food Photography', 'Wine'],
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
        location: 'Portland',
        skill: 'Beginner',
        playTime: 'Late Nights',
        personality: 'Creative'
    },
    {
        id: 9,
        name: 'Ava',
        age: 23,
        bio: 'Music producer and DJ. Loves rhythm games and electronic music production.',
        interests: ['Casual Games', 'Electronic', 'Production', 'DJing', 'Concerts', 'Streaming'],
        image: 'https://randomuser.me/api/portraits/women/9.jpg',
        location: 'Miami',
        skill: 'Intermediate',
        playTime: 'Nights',
        personality: 'Artistic'
    },
    {
        id: 10,
        name: 'Ethan',
        age: 28,
        bio: 'Mobile app developer and blockchain enthusiast. Looking for coding partners.',
        interests: ['Mobile Apps', 'Blockchain', 'Open Source', 'Python', 'JavaScript', 'Hackathons'],
        image: 'https://randomuser.me/api/portraits/men/10.jpg',
        location: 'Boston',
        skill: 'Advanced',
        playTime: 'Weekends',
        personality: 'Analytical'
    }
];

// Global variables
let currentBuddies = [...buddies];
let currentBuddyIndex = 0;
let cardContainer;
let activeCard = null;
let startX, startY, moveX, moveY;
let isDragging = false;
let acceptedBuddies = [];
let rejectedBuddies = [];

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    cardContainer = document.querySelector('.card-container');
    
    // Create initial cards
    createCards();
    
    // Event listeners
    setupEventListeners();
    
    // Set "All" category as active by default and show all interests
    const allCategory = document.querySelector('[data-category="all"]');
    allCategory.classList.add('active');
    document.getElementById('all-interests').style.display = 'flex';
    
    // Add event listeners for filter categories
    document.querySelectorAll('.filter-category').forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            document.querySelectorAll('.filter-category').forEach(cat => {
                cat.classList.remove('active');
            });
            
            // Add active class to clicked category
            category.classList.add('active');
            
            // Hide all interest filters
            document.querySelectorAll('.interest-filters').forEach(filter => {
                filter.style.display = 'none';
            });
            
            // Show the selected category's interest filters
            const categoryName = category.getAttribute('data-category');
            document.getElementById(`${categoryName}-interests`).style.display = 'flex';
            
            // Update the buddy cards based on the selected category
            updateBuddiesByCategory(categoryName);
        });
    });
});

// Calculate compatibility score between user and buddy
function calculateCompatibility(buddy) {
    let score = 0;
    
    // Interest match (50% of score)
    const commonInterests = buddy.interests.filter(interest => 
        userProfile.interests.includes(interest)
    );
    
    const interestScore = Math.min(commonInterests.length / 3 * 50, 50);
    score += interestScore;
    
    // Personality compatibility (25% of score)
    const personalityMap = {
        'Friendly': ['Friendly', 'Creative', 'Adventurous'],
        'Competitive': ['Competitive', 'Analytical'],
        'Creative': ['Creative', 'Artistic', 'Friendly'],
        'Analytical': ['Analytical', 'Strategic', 'Competitive'],
        'Adventurous': ['Adventurous', 'Energetic', 'Creative'],
        'Energetic': ['Energetic', 'Adventurous', 'Friendly'],
        'Artistic': ['Artistic', 'Creative'],
        'Strategic': ['Strategic', 'Analytical', 'Competitive']
    };
    
    const compatiblePersonalities = personalityMap[userProfile.personality] || [];
    if (compatiblePersonalities.includes(buddy.personality)) {
        score += 25;
    } else if (buddy.personality === userProfile.personality) {
        score += 25;
    } else {
        score += 10; // Some compatibility for different personalities
    }
    
    // Location (10% of score)
    if (buddy.location === userProfile.location) {
        score += 10;
    }
    
    // Play time compatibility (15% of score)
    const playTimeMap = {
        'Mornings': ['Mornings', 'Flexible'],
        'Evenings': ['Evenings', 'Evenings & Weekends', 'Flexible'],
        'Nights': ['Nights', 'Late Nights', 'Flexible'],
        'Late Nights': ['Late Nights', 'Nights', 'Flexible'],
        'Weekends': ['Weekends', 'Evenings & Weekends', 'Flexible'],
        'Evenings & Weekends': ['Evenings', 'Weekends', 'Evenings & Weekends', 'Flexible'],
        'Flexible': ['Mornings', 'Evenings', 'Nights', 'Late Nights', 'Weekends', 'Evenings & Weekends', 'Flexible', 'Daily']
    };
    
    const compatiblePlayTimes = playTimeMap[userProfile.playTime] || [];
    if (compatiblePlayTimes.includes(buddy.playTime)) {
        score += 15;
    }
    
    return Math.round(score);
}

// Create cards for each buddy
function createCards() {
    for (let i = 0; i < currentBuddies.length; i++) {
        const buddy = currentBuddies[i];
        const compatibilityScore = calculateCompatibility(buddy);
        
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-image" style="background-image: url('${buddy.image}')"></div>
            <div class="card-content">
                <div class="card-name">${buddy.name}, ${buddy.age} <span style="color: #e63946;">${compatibilityScore}% Match</span></div>
                <div class="card-info"><i class="fas fa-map-marker-alt"></i> ${buddy.location}</div>
                <div class="card-info"><i class="fas fa-user"></i> ${buddy.personality}</div>
                <div class="card-info"><i class="fas fa-clock"></i> Active: ${buddy.playTime}</div>
                <div class="card-bio">${buddy.bio}</div>
                <div class="card-interests">
                    ${buddy.interests.map(interest => `<div class="card-interest">${interest}</div>`).join('')}
                </div>
            </div>
        `;
        
        cardContainer.appendChild(card);
    }
    
    // If no cards were created, show empty state
    if (currentBuddies.length === 0) {
        const emptyCard = document.createElement('div');
        emptyCard.className = 'card';
        emptyCard.innerHTML = `
            <div class="card-content" style="height: 100%;">
                <i class="fas fa-search"></i>
                <h3>No Buddies Found</h3>
                <p>Try changing your filters or check back later for new buddies!</p>
            </div>
        `;
        cardContainer.appendChild(emptyCard);
    }
    
    // Set up the first card
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        activeCard = cards[0];
        activeCard.style.zIndex = 1;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Interest tag filters
    document.querySelectorAll('.interest-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
            filterBuddiesByInterests();
        });
    });
    
    // Accept button
    document.getElementById('accept-btn').addEventListener('click', () => {
        if (activeCard) {
            acceptBuddy();
        }
    });
    
    // Reject button
    document.getElementById('reject-btn').addEventListener('click', () => {
        if (activeCard) {
            rejectBuddy();
        }
    });
    
    // Match popup buttons
    document.getElementById('keep-swiping').addEventListener('click', () => {
        document.getElementById('match-popup').classList.remove('active');
    });
    
    document.getElementById('send-message').addEventListener('click', () => {
        alert('Messaging feature coming soon!');
        document.getElementById('match-popup').classList.remove('active');
    });
    
    // Tutorial buttons
    document.getElementById('show-tutorial').addEventListener('click', showTutorial);
    document.getElementById('got-it').addEventListener('click', () => {
        document.getElementById('swipe-tutorial').classList.remove('active');
    });
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && activeCard) {
            acceptBuddy();
        } else if (e.key === 'ArrowDown' && activeCard) {
            rejectBuddy();
        }
    });
    
    // Touch and mouse events for cards
    setupCardDragEvents();
}

// Set up drag events for cards
function setupCardDragEvents() {
    cardContainer.addEventListener('mousedown', dragStart);
    cardContainer.addEventListener('touchstart', dragStart, { passive: true });
    
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('touchmove', dragMove, { passive: false });
    
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
}

// Start dragging
function dragStart(e) {
    if (!activeCard) return;
    
    isDragging = true;
    
    if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    } else {
        startX = e.clientX;
        startY = e.clientY;
    }
    
    // Add grabbing cursor
    activeCard.style.cursor = 'grabbing';
}

// Move while dragging
function dragMove(e) {
    if (!isDragging || !activeCard) return;
    
    e.preventDefault();
    
    if (e.type === 'touchmove') {
        moveX = e.touches[0].clientX - startX;
        moveY = e.touches[0].clientY - startY;
    } else {
        moveX = e.clientX - startX;
        moveY = e.clientY - startY;
    }
    
    // Move the card
    activeCard.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.1}deg)`;
    
    // Show accept/reject indicators
    const upIndicator = document.querySelector('.swipe-indicator.up');
    const downIndicator = document.querySelector('.swipe-indicator.down');
    
    if (moveY < -50) {
        upIndicator.style.opacity = Math.min(Math.abs(moveY) / 100, 1);
        downIndicator.style.opacity = 0;
    } else if (moveY > 50) {
        downIndicator.style.opacity = Math.min(Math.abs(moveY) / 100, 1);
        upIndicator.style.opacity = 0;
    } else {
        upIndicator.style.opacity = 0;
        downIndicator.style.opacity = 0;
    }
}

// End dragging
function dragEnd() {
    if (!isDragging || !activeCard) return;
    
    isDragging = false;
    
    // Reset cursor
    activeCard.style.cursor = 'grab';
    
    // Hide indicators
    document.querySelector('.swipe-indicator.up').style.opacity = 0;
    document.querySelector('.swipe-indicator.down').style.opacity = 0;
    
    // Check if the card was dragged enough to trigger accept/reject
    if (moveY < -100) {
        acceptBuddy();
    } else if (moveY > 100) {
        rejectBuddy();
    } else {
        // Reset card position
        activeCard.style.transform = '';
    }
    
    // Reset move variables
    moveX = 0;
    moveY = 0;
}

// Accept a buddy
function acceptBuddy() {
    if (!activeCard) return;
    
    // Add the accepted buddy to the list
    const buddyId = currentBuddies[currentBuddyIndex].id;
    acceptedBuddies.push(buddyId);
    
    // Animate the card
    activeCard.classList.add('swipe-up');
    
    // Show match popup (50% chance for demo purposes)
    if (Math.random() > 0.5) {
        setTimeout(() => {
            showMatchPopup(currentBuddies[currentBuddyIndex]);
        }, 500);
    }
    
    // Move to next card
    setTimeout(() => {
        nextCard();
    }, 300);
}

// Reject a buddy
function rejectBuddy() {
    if (!activeCard) return;
    
    // Add the rejected buddy to the list
    const buddyId = currentBuddies[currentBuddyIndex].id;
    rejectedBuddies.push(buddyId);
    
    // Animate the card
    activeCard.classList.add('swipe-down');
    
    // Move to next card
    setTimeout(() => {
        nextCard();
    }, 300);
}

// Move to the next card
function nextCard() {
    // Remove current card
    if (activeCard) {
        cardContainer.removeChild(activeCard);
    }
    
    // Increment index
    currentBuddyIndex++;
    
    // Check if we've gone through all buddies
    if (currentBuddyIndex >= currentBuddies.length) {
        // Show empty state
        const emptyCard = document.createElement('div');
        emptyCard.className = 'card';
        emptyCard.innerHTML = `
            <div class="card-content" style="height: 100%;">
                <i class="fas fa-check-circle"></i>
                <h3>You're All Caught Up!</h3>
                <p>Check back later for more buddy recommendations.</p>
            </div>
        `;
        cardContainer.appendChild(emptyCard);
        activeCard = emptyCard;
        return;
    }
    
    // Set the next card as active
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        activeCard = cards[0];
        activeCard.style.zIndex = 1;
    } else {
        activeCard = null;
    }
}

// Filter buddies based on selected interests
function filterBuddiesByInterests() {
    const selectedInterests = Array.from(document.querySelectorAll('.interest-tag.active'))
        .map(tag => tag.getAttribute('data-interest'));
    
    // If no interests are selected, show all buddies
    if (selectedInterests.length === 0) {
        currentBuddies = [...buddies];
    } else {
        // Filter buddies based on selected interests
        currentBuddies = buddies.filter(buddy => 
            buddy.interests.some(interest => selectedInterests.includes(interest))
        );
    }
    
    // Reset index
    currentBuddyIndex = 0;
    
    // Clear existing cards
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    
    // Create new cards
    createCards();
}

// Show match popup
function showMatchPopup(buddy) {
    document.getElementById('buddy-img').src = buddy.image;
    document.getElementById('user-img').src = userProfile.image;
    document.getElementById('buddy-name').textContent = buddy.name;
    document.getElementById('match-popup').classList.add('active');
}

// Show tutorial
function showTutorial() {
    document.getElementById('swipe-tutorial').classList.add('active');
}

// Check if tutorial has been shown before
if (!localStorage.getItem('tutorialShown')) {
    setTimeout(showTutorial, 1000);
    localStorage.setItem('tutorialShown', 'true');
}

// Function to update buddies based on selected category
function updateBuddiesByCategory(category) {
    // Clear existing buddies
    currentBuddyIndex = 0;
    
    // Filter buddies based on category
    let filteredBuddies = [];
    
    switch(category) {
        case 'all':
            filteredBuddies = buddies;
            break;
        case 'gaming':
            filteredBuddies = buddies.filter(buddy => 
                buddy.interests.some(interest => 
                    ['FPS Games', 'MOBA Games', 'RPG Games', 'Strategy Games', 
                     'Casual Games', 'eSports', 'Streaming', 'Game Development', 'Cosplay'].includes(interest)
                )
            );
            break;
        case 'food':
            filteredBuddies = buddies.filter(buddy => 
                buddy.interests.some(interest => 
                    ['Italian Cuisine', 'Asian Cuisine', 'Baking', 'BBQ', 
                     'Vegan', 'Desserts', 'Coffee', 'Wine', 'Food Photography'].includes(interest)
                )
            );
            break;
        case 'coding':
            filteredBuddies = buddies.filter(buddy => 
                buddy.interests.some(interest => 
                    ['Web Development', 'Mobile Apps', 'Data Science', 'Machine Learning', 
                     'JavaScript', 'Python', 'Open Source', 'Hackathons', 'Blockchain'].includes(interest)
                )
            );
            break;
        case 'fitness':
            filteredBuddies = buddies.filter(buddy => 
                buddy.interests.some(interest => 
                    ['Yoga', 'Running', 'Weightlifting', 'Cycling', 
                     'Hiking', 'Swimming', 'Martial Arts', 'Team Sports', 'Nutrition'].includes(interest)
                )
            );
            break;
        case 'music':
            filteredBuddies = buddies.filter(buddy => 
                buddy.interests.some(interest => 
                    ['Rock', 'Hip Hop', 'Electronic', 'Classical', 
                     'Jazz', 'Instruments', 'Production', 'Concerts', 'DJing'].includes(interest)
                )
            );
            break;
        case 'travel':
            filteredBuddies = buddies.filter(buddy => 
                buddy.interests.some(interest => 
                    ['Backpacking', 'City Breaks', 'Beach Holidays', 'Road Trips', 
                     'Photography', 'Food Tourism', 'Adventure Travel', 'Cultural Experiences', 'Budget Travel'].includes(interest)
                )
            );
            break;
        default:
            filteredBuddies = buddies;
    }
    
    // If no buddies match the category, show all buddies
    if (filteredBuddies.length === 0) {
        filteredBuddies = buddies;
    }
    
    // Update the current buddies array
    currentBuddies = filteredBuddies;
    
    // Remove existing cards
    const cardContainer = document.querySelector('.card-container');
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    
    // Create new cards
    createCards();
}