"use strict";
// app.ts
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const resumeContainer = document.getElementById('resume');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name');
        const location = formData.get('location');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const jobTitle = formData.get('job-title');
        const company = formData.get('company');
        const jobDates = formData.get('job-dates');
        const educationDegree = formData.get('education-degree');
        const educationInstitution = formData.get('education-institution');
        const resumeHtml = `
        <header>
          <h1>${name}</h1>
          <p>${location} | ${phone} | ${email}</p>
        </header>
        <main>
          <section class="experience">
            <h2>Work Experience</h2>
            <div class="job">
              <h3>${jobTitle}</h3>
              <p>${company} (${jobDates})</p>
              <ul>
                <li>Developed and executed video content strategies.</li>
                <li>Scripted, shot, directed, and edited video content.</li>
                <li>Collaborated with fitness models and staff to create compelling visuals.</li>
                <li>Utilized advanced video production techniques.</li>
                <li>Enhanced social media presence, drove engagement, and promoted programs.</li>
              </ul>
            </div>
          </section>
  
          <section class="education">
            <h2>Education</h2>
            <div class="degree">
              <h3>${educationDegree}</h3>
              <p>${educationInstitution} (Present)</p>
            </div>
          </section>
  
          <section class="skills">
            <h2>Skills</h2>
            <ul>
              <li>Communication Skills</li>
              <li>Maintenance</li>
              <li>JavaScript</li>
              <li class="hidden">ReactJS</li>
              <li class="hidden">Video Editing</li>
              <li class="hidden">Artificial Intelligence</li>
              <li class="hidden">Marketing</li>
            </ul>
            <button class="toggle-button">see more</button>
          </section>
        </main>
      `;
        resumeContainer.innerHTML = resumeHtml;
        // Add event listener for "see more" button
        const toggleButton = document.querySelector(".toggle-button");
        const hiddenElements = document.querySelectorAll(".hidden");
        toggleButton === null || toggleButton === void 0 ? void 0 : toggleButton.addEventListener('click', () => {
            hiddenElements.forEach(element => {
                element.classList.toggle('show');
            });
        });
    });
});
