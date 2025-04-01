// Step management
const steps = ['email', 'name', 'dob', 'interests'];
let currentStep = 0;

// DOM Elements
const progressBar = document.getElementById('signup-progress');
const dobInput = document.getElementById('dob-input');
const ageWarning = document.getElementById('age-warning');
const interestsGrid = document.getElementById('interests-grid');
const selectedInterests = document.getElementById('selected-interests');
const interestCount = document.getElementById('interest-count');

// State
let selectedInterestsList = [];

document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    setupDateInput();
    loadInterests();
});

function updateProgress() {
    const progress = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function setupDateInput() {
    dobInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '-' + value.slice(2);
        }
        if (value.length >= 5) {
            value = value.slice(0, 5) + '-' + value.slice(5);
        }
        e.target.value = value.slice(0, 10);
        validateAge();
    });
}

function validateAge() {
    const dateStr = dobInput.value;
    if (!/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        dobInput.style.borderColor = '#ff4b6e';
        return false;
    }

    const [day, month, year] = dateStr.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date('2025-04-01');
    
    // Check if date is valid
    if (isNaN(selectedDate.getTime()) || 
        selectedDate.getDate() !== day || 
        selectedDate.getMonth() !== month - 1 || 
        selectedDate.getFullYear() !== year ||
        selectedDate > today) {
        dobInput.style.borderColor = '#ff4b6e';
        return false;
    }
    
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
    }
    
    if (age < 18) {
        ageWarning.style.display = 'block';
        dobInput.style.borderColor = '#ff4b6e';
        return false;
    } else {
        ageWarning.style.display = 'none';
        dobInput.style.borderColor = '#e1e1e1';
        return true;
    }
}

async function loadInterests() {
    try {
        const response = await fetch('interests.txt');
        const text = await response.text();
        const interests = text.split('\n').filter(interest => interest.trim());
        
        interestsGrid.innerHTML = interests.map(interest => `
            <div class="interest-tag" onclick="toggleInterest('${interest.trim()}')">${interest.trim()}</div>
        `).join('');
    } catch (error) {
        console.error('Error loading interests:', error);
    }
}

function toggleInterest(interest) {
    if (selectedInterestsList.includes(interest)) {
        selectedInterestsList = selectedInterestsList.filter(i => i !== interest);
    } else if (selectedInterestsList.length < 5) {
        selectedInterestsList.push(interest);
    }
    
    updateInterestsUI();
}

function updateInterestsUI() {
    // Update selected interests display
    if (selectedInterestsList.length === 0) {
        selectedInterests.innerHTML = '<p class="hint">Your selected interests will appear here</p>';
    } else {
        selectedInterests.innerHTML = selectedInterestsList.map(interest => `
            <div class="interest-tag selected" onclick="toggleInterest('${interest}')">${interest}</div>
        `).join('');
    }
    
    // Update count
    interestCount.textContent = selectedInterestsList.length;
    
    // Update grid items
    document.querySelectorAll('.interests-grid .interest-tag').forEach(tag => {
        const interest = tag.textContent;
        if (selectedInterestsList.includes(interest)) {
            tag.classList.add('selected');
        } else {
            tag.classList.remove('selected');
        }
        
        if (!selectedInterestsList.includes(interest) && selectedInterestsList.length >= 5) {
            tag.classList.add('disabled');
        } else {
            tag.classList.remove('disabled');
        }
    });
}

function validateStep(stepId) {
    switch (stepId) {
        case 'email':
            const email = document.getElementById('signup-email').value.trim();
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        case 'name':
            return document.getElementById('signup-name').value.trim().length >= 2;
        case 'dob':
            const dateStr = dobInput.value;
            console.log('Validating DOB:', dateStr);

            // Check format
            if (!/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
                console.log('Invalid date format');
                dobInput.style.borderColor = '#ff4b6e';
                return false;
            }

            const [day, month, year] = dateStr.split('-').map(Number);
            console.log('Parsed date:', { day, month, year });

            // Validate month and day ranges
            if (month < 1 || month > 12) {
                console.log('Invalid month');
                dobInput.style.borderColor = '#ff4b6e';
                return false;
            }

            const daysInMonth = new Date(year, month, 0).getDate();
            if (day < 1 || day > daysInMonth) {
                console.log('Invalid day for month');
                dobInput.style.borderColor = '#ff4b6e';
                return false;
            }

            const selectedDate = new Date(year, month - 1, day);
            const today = new Date('2025-04-01');
            
            console.log('Selected date:', selectedDate);
            console.log('Today:', today);

            // Check if date is valid and not in future
            if (selectedDate > today) {
                console.log('Date is in future');
                dobInput.style.borderColor = '#ff4b6e';
                return false;
            }
            
            const age = today.getFullYear() - selectedDate.getFullYear();
            const monthDiff = today.getMonth() - selectedDate.getMonth();
            const dayDiff = today.getDate() - selectedDate.getDate();
            
            console.log('Age calculation:', { age, monthDiff, dayDiff });
            
            const finalAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) 
                ? age - 1 
                : age;
            
            console.log('Final age:', finalAge);
            
            if (finalAge < 18) {
                console.log('User is under 18');
                dobInput.style.borderColor = '#ff4b6e';
                ageWarning.style.display = 'block';
                return false;
            }

            dobInput.style.borderColor = '#e1e1e1';
            ageWarning.style.display = 'none';
            return true;
        case 'interests':
            return selectedInterestsList.length > 0;
        default:
            return false;
    }
}

function nextStep(currentStepId) {
    if (!validateStep(currentStepId)) return;
    
    document.getElementById(`step-${steps[currentStep]}`).classList.add('hidden');
    currentStep++;
    
    if (currentStep < steps.length) {
        document.getElementById(`step-${steps[currentStep]}`).classList.remove('hidden');
        updateProgress();
    } else {
        submitForm();
    }
}

function prevStep() {
    if (currentStep === 0) return;
    
    document.getElementById(`step-${steps[currentStep]}`).classList.add('hidden');
    currentStep--;
    document.getElementById(`step-${steps[currentStep]}`).classList.remove('hidden');
    updateProgress();
}

function submitForm() {
    const userData = {
        email: document.getElementById('signup-email').value,
        name: document.getElementById('signup-name').value,
        dob: dobInput.value,
        interests: selectedInterestsList
    };
    
    console.log('Form submitted:', userData);
    // Here you would typically send the data to your server
    window.location.href = 'success.html';
}
