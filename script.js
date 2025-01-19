// Selecting elements
const inputBox = document.getElementById('input-box');
const addButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const categorySelect = document.getElementById('category');

// Add a new task when the Add button is clicked or Enter key is pressed
addButton.addEventListener('click', addTask);
inputBox.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = inputBox.value.trim();
    const category = categorySelect.value;

    // Validate input
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new task item
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    listItem.innerHTML = `
        <span>${taskText}</span>
        <span class="category ${category}">${capitalize(category)}</span>
        <div class="actions">
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✖</button>
        </div>
    `;

    // Add the task to the list
    taskList.appendChild(listItem);

    // Clear input field
    inputBox.value = '';

    // Add event listeners for the task buttons
    listItem.querySelector('.complete-btn').addEventListener('click', () => {
        listItem.classList.toggle('completed');
    });

    listItem.querySelector('.delete-btn').addEventListener('click', () => {
        listItem.remove();
    });
}

// Capitalize the first letter of a string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Apply filters to display tasks based on their category
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;

    const filter = e.target.dataset.filter;
    const tasks = document.querySelectorAll('.task-item');

    tasks.forEach((task) => {
        const category = task.querySelector('.category').textContent.toLowerCase();

        if (filter === 'all' || category === filter) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
});
