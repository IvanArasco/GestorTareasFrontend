let tasks = [];

createTasks();
renderTasks();

function createTasks() {
    for (let i = 0; i < 5; i++) {
        tasks[i] = {
            // id, titulo, tipo, fechaLimite y nombreUsuario.
            id: i,
            title: "Tarea 00" + i,
            type: "",
            expiration: "2025-06-30",
            userName: "Ivan"
        }
    }
}

function renderTasks() {
    const taskList = document.getElementById("task-list");

    let html = "";
    tasks.forEach(task => {
        html += "<article data-id='" + task.id + "' class='col-12 col-md-6 col-lg-4 task-card card'>";
        html += "<h2>" + task.title + "</h2>";
        html += "<p>Usuario: " + task.userName + "</p>";
        html += "<p>Vence: " + task.expiration + "</p>";
        html += "</article>";
    });

    taskList.innerHTML += html;
}



