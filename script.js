document.getElementById('loadButton').addEventListener('click', function() {
  const goal = document.getElementById('goalSelect').value;
  fetch('/data.json')
    .then(response => response.json())
    .then(data => {
      const goalData = data[goal];

      // Load Courses
      const courseList = document.getElementById('courseList');
      courseList.innerHTML = goalData.courses.map(course => `<li>${course}</li>`).join('');

      // Load Roadmap
      const roadmapList = document.getElementById('roadmapList');
      roadmapList.innerHTML = goalData.roadmap.map(step => `<li>${step}</li>`).join('');

      // Load Certificates
      const certificateList = document.getElementById('certificateList');
      certificateList.innerHTML = goalData.certificates.map(cert => `<li>${cert}</li>`).join('');

      // Load Internships
      const internshipList = document.getElementById('internshipList');
      internshipList.innerHTML = goalData.internships.map(internship => `<li>${internship}</li>`).join('');

      // Load University Programs
      const universityList = document.getElementById('universityList');
      universityList.innerHTML = goalData.university_programs.map(program => `<li>${program}</li>`).join('');
    });
});

document.getElementById('scheduleCall').addEventListener('click', function() {
  alert('Schedule a call feature will be implemented soon.');
});