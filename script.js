async function loadCourses() {
  const goal = document.getElementById('goalSelect').value;
  
  try {
    const response = await fetch(`/courses?goal=${encodeURIComponent(goal)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Update DOM elements
    const updateList = (elementId, items) => {
      const list = document.getElementById(elementId);
      list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    };

    updateList('courseList', data.courses);
    updateList('roadmapList', data.roadmap);
    updateList('certificateList', data.certificates);

  } catch (error) {
    console.error('Failed to load courses:', error);
    alert('Failed to load data. Please try again.');
  }
}