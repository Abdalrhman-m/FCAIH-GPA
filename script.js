// Get the elements
const subjectsContainer = document.getElementById('subjects-container');
const addSubjectButton = document.getElementById('add-subject');
const termGpaElement = document.getElementById('term-gpa');
const cumulativeGpaElement = document.getElementById('cumulative-gpa');
const totalHoursElement = document.getElementById('total-hours');
const previousHoursElement = document.getElementById('prev-hours');
const previousGpaElement = document.getElementById('prev-gpa');

// Initialize the subjects array
let subjects = [];

// Add event listener to the "Add Subject" button
addSubjectButton.addEventListener('click', addSubject);

// Function to add a new subject
function addSubject() {
  // Create input fields for grade and hours
  const subjectDiv = document.createElement('div');
  subjectDiv.className = 'subject';
  subjectDiv.innerHTML = `
    <label for="subject-grade">Grade</label>
    <select id="subject-grade">
      <option value="">Select Grade</option>
      <option value="4.0">A+</option>
      <option value="4.0">A</option>
      <option value="3.3">B+</option>
      <option value="3.0">B</option>
      <option value="2.3">C+</option>
      <option value="2.0">C</option>
      <option value="1.3">D+</option>
      <option value="1.0">D</option>
      <option value="0.0">F</option>
    </select>
    <label for="subject-is-2-hours" style="display: inline-block; margin-right: 5px;">Is 2 hours?</label>
    <input type="checkbox" id="subject-is-2-hours" style="display: inline-block; margin-right: 10px;">
    <button class="remove-subject">&#10005;</button>
  `;
  subjectsContainer.appendChild(subjectDiv);

  // Get the input values and add to the subjects array
  const subjectGradeSelect = subjectDiv.querySelector('#subject-grade');
  const subjectIs2HoursCheckbox = subjectDiv.querySelector('#subject-is-2-hours');
  const removeSubjectButton = subjectDiv.querySelector('.remove-subject');

  const subjectData = {
    grade: null,
    hours: 3,
    div: subjectDiv,
  };
  subjects.push(subjectData);

  subjectGradeSelect.addEventListener('change', () => {
    subjectData.grade = parseFloat(subjectGradeSelect.value);
    calculateGpa();
  });

  subjectIs2HoursCheckbox.addEventListener('change', () => {
    subjectData.hours = subjectIs2HoursCheckbox.checked ? 2 : 3;
    calculateGpa();
  });

  removeSubjectButton.addEventListener('click', () => {
    subjects = subjects.filter(subject => subject !== subjectData);
    subjectDiv.remove();
    calculateGpa();
  });
}

// Function to calculate the current term GPA and cumulative GPA
function calculateGpa() {
  let totalHours = 0;
  let totalGradePoints = 0;

  subjects.forEach((subject) => {
    if (subject.grade !== null) {
      totalHours += subject.hours;
      totalGradePoints += subject.grade * subject.hours;
    }
  });

  const termGpa = totalGradePoints / totalHours || 0;
  const cumulativeGpa = (
    (parseFloat(previousGpaElement.value) * parseInt(previousHoursElement.value) + totalGradePoints) /
    (parseInt(previousHoursElement.value) + totalHours)
  ) || 0;

  termGpaElement.textContent = termGpa.toFixed(2);
  cumulativeGpaElement.textContent = cumulativeGpa.toFixed(2);
  totalHoursElement.textContent = parseInt(previousHoursElement.value) + totalHours;
}

// Initialize the GPA calculation
calculateGpa();

// Add default subjects
for (let i = 0; i < 6; i++) {
  addSubject();
}