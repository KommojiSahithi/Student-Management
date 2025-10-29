// Select elements
const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const searchInput = document.getElementById('search');
const sortNameBtn = document.getElementById('sortName');
const sortRollBtn = document.getElementById('sortRoll');

// Load students from localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to display students
function displayStudents(list) {
    studentList.innerHTML = '';
    list.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
        `;
        studentList.appendChild(row);
    });
}

// Initial display
displayStudents(students);

// Add student
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const roll = document.getElementById('roll').value.trim();

    students.push({name, roll});
    localStorage.setItem('students', JSON.stringify(students));

    displayStudents(students);
    studentForm.reset();
});

// Delete student
studentList.addEventListener('click', function(e) {
    if(e.target.classList.contains('deleteBtn')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents(students);
    }
});

// Search students
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filtered = students.filter(s => s.name.toLowerCase().includes(query) || s.roll.toLowerCase().includes(query));
    displayStudents(filtered);
});

// Sort by Name
sortNameBtn.addEventListener('click', function() {
    students.sort((a,b) => a.name.localeCompare(b.name));
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents(students);
});

// Sort by Roll Number
sortRollBtn.addEventListener('click', function() {
    students.sort((a,b) => a.roll.localeCompare(b.roll));
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents(students);
});