// Data
const students = [
  { id: "S001", name: "Mahbuba Rahman", subject: "Math", grade: "A+" },
  { id: "S002", name: "John Doe", subject: "Science", grade: "B" },
  { id: "S003", name: "Emily Zhang", subject: "English", grade: "A" },
  { id: "S004", name: "Ali Khan", subject: "Math", grade: "C" },
  { id: "S005", name: "Sofia Martinez", subject: "History", grade: "A+" },
  { id: "S006", name: "David Lee", subject: "Physics", grade: "Fail" },
  { id: "S007", name: "Fatima Noor", subject: "Chemistry", grade: "B" },
  { id: "S008", name: "James Smith", subject: "Biology", grade: "A" },
  { id: "S009", name: "Linda Park", subject: "Geography", grade: "C" },
  { id: "S010", name: "Mohammed Abbas", subject: "Math", grade: "A+" }
];

//  DOM Elements
const studentsContainer = document.getElementById('studentTable');
const searchInput = document.getElementById('searchInput');
const gradeFilter = document.getElementById('gradeFilter');
const sortByDropdown = document.getElementById('sortBy');
const addStudentForm = document.getElementById('addStudentForm');

//  Display Students
const showAllStudents = (students, searchValue = '') => {
  studentsContainer.innerHTML = '';
  students.forEach(student => {
    const highlightedName = student.name.replace(
      new RegExp(searchValue, 'gi'),
      match => `<mark>${match}</mark>`
    );

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${highlightedName}</td>
      <td>${student.subject}</td>
      <td>${student.grade}</td>
      <td class="action-cell">
        <i class="fas fa-edit edit-icon"></i>
        <i class="delete fas fa-trash delete-icon"></i>
      </td>
    `;
    studentsContainer.appendChild(tr);
  });
};

//  Inline Edit
const editStudentInfo = (clicked) => {
  const row = clicked.closest('tr');
  const cells = row.querySelectorAll('td');
  for (let i = 0; i < cells.length - 1; i++) {
    const cell = cells[i];
    const originalText = cell.innerText;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'inline-editor';
    input.value = originalText;
    cell.innerText = '';
    cell.appendChild(input);

    input.addEventListener('blur', () => {
      const newValue = input.value.trim();
      const finalText = newValue === '' || newValue === originalText ? originalText : newValue;
      cell.innerText = finalText;
    });
  }
};

//  Delete Student
const deleteStudentInfo = (clicked) => {
  const studentContainer = clicked.closest('tr');
  studentContainer.remove();
};

//  Search Functionality
searchInput.addEventListener('input', (e) => {
  const searchValue = e.target.value.toLowerCase();
  const filteredStudents = students.filter(student =>
    student.id.toLowerCase().includes(searchValue) ||
    student.name.toLowerCase().includes(searchValue)
  );
  showAllStudents(filteredStudents, searchValue);
});

//  Grade Filter
gradeFilter.addEventListener('change', (e) => {
  const selectedGrade = e.target.value;
  const filteredStudents = selectedGrade
    ? students.filter(student => student.grade === selectedGrade)
    : students;
  showAllStudents(filteredStudents);
});

//  Add Student
addStudentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const studentId = document.getElementById('studentId').value.trim();
  const studentName = document.getElementById('studentName').value.trim();
  const studentSubject = document.getElementById('subject').value.trim();
  const studentGrade = document.getElementById('grade').value.trim();

  const student = {
    id: studentId,
    name: studentName,
    subject: studentSubject,
    grade: studentGrade
  };

  students.push(student);
  showAllStudents(students);
  addStudentForm.reset();
});

//  Sort Students
sortByDropdown.addEventListener('change', (e) => {
  const sortBy = e.target.value;
  let sortedStudents = [...students];

  if (sortBy === 'name') {
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === 'id') {
    sortedStudents.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)));
  }

  if (sortBy === 'grade') {
    const gradeOrder = ['A+', 'A', 'B', 'C', 'Fail'];
    sortedStudents.sort((a, b) =>
      gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade)
    );
  }

  showAllStudents(sortedStudents);
});

//  Action Icons (Edit/Delete)
studentsContainer.addEventListener('click', (e) => {
  const clicked = e.target;
  if (clicked.classList.contains('edit-icon')) {
    editStudentInfo(clicked);
  }
  if (clicked.classList.contains('delete-icon')) {
    deleteStudentInfo(clicked);
  }
});

//  Initial Render
showAllStudents(students);