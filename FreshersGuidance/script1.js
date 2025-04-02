// Slideshow Logic
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  slides.forEach(slide => slide.style.display = 'none');
  dots.forEach(dot => dot.classList.remove('active'));

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].classList.add('active');

  setTimeout(showSlides, 5000);
}

// Navigation Arrows
document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.next').addEventListener('click', () => changeSlide(1));

function changeSlide(n) {
  slideIndex += n;
  showSlides();
}

// Dots Navigation
document.querySelectorAll('.dot').forEach((dot, index) => {
  dot.addEventListener('click', () => currentSlide(index + 1));
});

function currentSlide(n) {
  slideIndex = n;
  showSlides();
}

// Goal Selection Logic
document.querySelectorAll('.select-goal').forEach(button => {
  button.addEventListener('click', function () {
    const goal = this.getAttribute('data-goal');
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        const goalData = data[goal];

        // Populate Courses with Links
        const courseList = document.getElementById('courseList');
        courseList.innerHTML = goalData.courses.map(course => `
          <div class="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-white transition-colors">
            <div class="flex-shrink-0">
              <i class="fas fa-book-open text-gray-500 mt-1 mr-4"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                ${getPlatformBadge(course.platform)}
                <span class="text-sm text-gray-500">${getCourseDuration()}</span>
              </div>
              <a href="${course.url}" target="_blank" class="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                ${course.name}
              </a>
            </div>
          </div>
        `).join('');

        // Populate Certificates
        const certificateList = document.getElementById('certificateList');
        certificateList.innerHTML = goalData.certificates.map(cert => `
          <div class="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-white transition-colors">
            <div class="flex-shrink-0">
              <i class="fas fa-certificate text-gray-500 mt-1 mr-4"></i>
            </div>
            <div>
              <div class="mb-1">
                ${getPlatformBadge(cert)}
              </div>
              <p class="font-medium text-gray-800">${cert}</p>
            </div>
          </div>
        `).join('');

        // Show and scroll to section
        const detailsSection = document.getElementById('coursesSection');
        detailsSection.classList.remove('hidden');
        detailsSection.scrollIntoView({ behavior: 'smooth' });
      })
      .catch(error => console.error('Error loading data:', error));
  });
});

// Helper functions
function getPlatformBadge(platform) {
  const classes = {
    'Coursera': 'coursera',
    'Udemy': 'udemy',
    'FreeCodeCamp': 'freecodecamp',
    'Kaggle': 'kaggle'
  }[platform] || 'bg-gray-100 text-gray-800';
  
  return `<span class="platform-badge ${classes}">${platform}</span>`;
}

function getCourseDuration() {
  const durations = ['4 weeks', '6 weeks', '8 weeks', '12 weeks'];
  return durations[Math.floor(Math.random() * durations.length)];
}