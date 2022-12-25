let tasks = []

const tableTasks = document.querySelector("#table-tasks");
const description = document.querySelector("#input-description");

const toggleCompleted = (id) => {
    const taskIndexSelected = tasks.findIndex(t => t.id === id);
    tasks[taskIndexSelected].isCompleted = !tasks[taskIndexSelected].isCompleted
    renderTable();
    if (tasks[taskIndexSelected].isCompleted) {
        const tdDescription = document.querySelector(`#td-${id}`);
        tdDescription.style.textDecoration = "line-through"
    }

}

const addTask = () => {
    tasks.push({ id: Date.now(), description: description.value, isCompleted: false });
    description.value = "";
    description.focus();
    renderTable();
}

const deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    renderTable();
}

const renderTable = () => {
    tableTasks.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Tarea</th>
        <th>ok?</th>
        <th>Del</th>    
    </tr>
    `
    for (let task of tasks) {
        tableTasks.innerHTML += `
        <tr>
            <td>${task.id}</td>
            <td id="td-${task.id}">${task.description}</td>
            <td><input onclick="toggleCompleted(${task.id})" type="checkbox" ${task.isCompleted ? 'checked' : null}></td>
            <td><button onclick="deleteTask(${task.id})">X</button></td>
        </tr>
        `
    }
}

/*
{ id: 1671922591400, description: "Tarea de prueba", isCompleted: true },
{ id: 1671922626923, description: "Tarea 2", isCompleted: false }
*/