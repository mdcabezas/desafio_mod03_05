// Asignar id aleatorio
const randomId = () => Math.random().toString(16).slice(10)

// Arreglo de tareas inicales
let tasks = [
    { id: randomId(), description: "Sacar la basura", isCompleted: false },
    { id: randomId(), description: "Comprar verduras", isCompleted: false },
    { id: randomId(), description: "Lavar la ropa", isCompleted: false }
]

// Inicializar variables de elementos en DOM
const tableTasks = document.querySelector("#table-tasks");
const description = document.querySelector("#input-description");
const taskTotal = document.querySelector("#total-task");
const taskCompleted = document.querySelector("#completed-task");

// Cambiar estado de tarea
const toggleCompleted = (id) => {
    const taskIndexSelected = tasks.findIndex(task => task.id === id);
    tasks[taskIndexSelected].isCompleted = !tasks[taskIndexSelected].isCompleted
    renderTable();
    calculateTotalTasks();
}

// Agregar una tarea
const addTask = () => {
    tasks.push({
        id: randomId(),
        description: description.value,
        isCompleted: false,
    });

    renderTable();
    calculateTotalTasks();
    clearFocusDescription();
}

// Eliminar una tarea
const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    renderTable();
    calculateTotalTasks();
}

// Calcular tareas totales y completadas
const calculateTotalTasks = () => {
    taskTotal.innerHTML = tasks.length
    let completed = 0;
    for (let task of tasks) {
        if (task.isCompleted) { completed++ }
    }
    taskCompleted.innerHTML = completed
}

// Renderizar tabla de tareas
const renderTable = () => {
    let trHtml = `
    <tr>
        <th>ID</th>
        <th>Tarea</th>
        <th>✔️</th>
        <th>🗑️</th>    
    </tr>
    `
    for (let task of tasks) {
        trHtml += `
        <tr>
            <td>${task.id}</td>
            <td id="td-${task.id}" ${task.isCompleted && 'class="text-line"'}>${task.description}</td>
            <td><input onclick="toggleCompleted('${task.id}')" type="checkbox" ${task.isCompleted && 'checked'}></td>
            <td><button onclick="deleteTask('${task.id}')">✖️</button></td>
        </tr>
        `
    }
    tableTasks.innerHTML = trHtml;
}

// Limpiar y enfocar input de ingreso
const clearFocusDescription = ()=>{
    description.value = "";
    description.focus();
}

// Cargar tareas iniciales
renderTable();
calculateTotalTasks();
clearFocusDescription();