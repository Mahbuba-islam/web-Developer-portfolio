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

const studentsContainer = document.getElementById('studentTable')
const searchInput = document.getElementById('searchInput')

const showAllStudents = (students, searchValue) => {
   studentsContainer.innerHTML = ''
   students.forEach(student => {
        console.log(student)
        const highlightedName = student.name.replace(new RegExp(searchValue, 'gi'), match=> `<mark>${match}</mark>`)
//        const highlightedName = student.name.replace(
//   new RegExp(searchValue, 'gi'),
//   match => `<mark>${match}</mark>`
// );

        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${student.id}</td>
          <td>${highlightedName}</td>
          <td>${student.subject}</td>
          <td>${student.grade}</td>
          <td class="action-cell">
            <i class="fas fa-edit edit-icon"></i>
            <i class="delete fas fa-trash delete-icon"></i>
          </td>`
          studentsContainer.appendChild(tr)
    })
}
showAllStudents(students)

// studentsContainer.addEventListener('click', (e)=> {
//     console.log(e.target)
//     const classType = e.target.className
//     const student = e.target.closest('tr')
//     const currentName = student.children[1]
   
//     // const classType = e.target.className
//     // console.log(classType)
//     if(classType === 'fas fa-edit edit-icon'){
//         console.log('fa-edit')
//      const newName = prompt('edit the student name:',  currentName.innerText)
//      if(newName.innerText !== null && newName.trim() !== ''){
//       currentName.innerText =newName
//      }
     
//     }
//     // if(classType === 'fa-delete'){
//     //  console.log('fa-delete')
//     // }
// })

studentsContainer.addEventListener('click', (e) => {
  const clicked = e.target;

  if (clicked.classList.contains('edit-icon')) {
 editStudentInfo(clicked)
  }


  if(clicked.classList.contains('delete-icon')){
    deleteStudentInfo(clicked)
  }


});



const editStudentInfo = (clicked) => {
  const row = clicked.closest('tr')
   const cells = row.querySelectorAll('td')
   for(let i=0 ; i<cells.length-1 ; i++){
    const cell = cells[i]
    const originalText = cell.innerText
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'inline-editor'
    input.value = originalText
    cell.innerText = ''
    cell.appendChild(input);
   
    input.addEventListener('blur', () => {
    const newValue = input.value.trim()
    //  restore original if empty or unchanged
    const finalText = cell.innerText = newValue === '' || newValue === originalText ? originalText : newValue
    cell.innerText = finalText
      
    })
   }
}


// delete
const deleteStudentInfo = (clicked) => {
  const studentContainer = clicked.closest('tr')
  studentContainer.remove()
}
  
//  filtered for search functionality
searchInput.addEventListener('input', (e) => {
 const searchValue = e.target.value.toLowerCase()
const filteredStudents = students.filter(student => {
  const studentId = student.id.toLowerCase()
  const studentName = student.name.toLowerCase()
 return studentId.includes(searchValue) || studentName.includes(searchValue)
 
  
 })
 showAllStudents(filteredStudents, searchValue)
})

document.getElementById('gradeFilter').addEventListener('change', (e) => {
 const selectedGrade = e.target.value
 console.log(selectedGrade)
 const filteredStudents = selectedGrade ? students.filter(student => student.grade===selectedGrade) 
 : students
 showAllStudents(filteredStudents)
})




