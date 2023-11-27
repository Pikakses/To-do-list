const add_task_btn = document.getElementById("add-task");
const submit_task_btn = document.getElementById("submit-task");
const add_window = document.querySelector(".add_window");

const title_input = document.getElementById("title");
const description_input = document.getElementById("description");

const tasks_container = document.getElementById("tasks-container");

function reload() {
        fetch("http://localhost/To-do/tasks", {
        method: "GET",
    })
    .then(res => {
        res.text()
        .then((data) => {
            console.log(data);
            data = JSON.parse(data);
            data.forEach(task => {
                const taskDiv = document.createElement("div");
                taskDiv.className = "task-item";

                const topDiv = document.createElement("div");
                topDiv.className = "horizontal-task-div";
                
                const taskTitle = document.createElement("p");
                taskTitle.textContent = task.title;
                taskTitle.className = "task-title";

                const middleDiv = document.createElement("div");
                middleDiv.className = "horizontal-task-div";

                const bottomDiv = document.createElement("div");
                bottomDiv.className = "horizontal-task-div";

                const taskDescription = document.createElement("p");
                taskDescription.textContent = task.description;
                taskDescription.className = "task-description";

                if(task.status == 1) {
                    taskTitle.classList.toggle("done")
                    taskDescription.classList.toggle("done")
                }

                const deleteButton = document.createElement("button");
                deleteButton.className = "button-med";
                deleteButton.textContent = "Usuń"

                deleteButton.addEventListener("click", e => {
                    fetch(`http://localhost/To-do/tasks/${task.id}`, {
                        method: "DELETE",
                    });
                    const deleteButtonParent = deleteButton.parentElement.parentElement
                    deleteButtonParent.remove();
                });

                const changeStatusButton = document.createElement("button");
                changeStatusButton.className = "button-med";
                changeStatusButton.textContent = "Zmień Status";
                changeStatusButton.addEventListener("click", e => {
                    fetch(`http://localhost/To-do/tasks.php/?id=${task.id}&status=${task.status}`, {
                        method: "PUT",
                    });
                    taskTitle.classList.toggle("done");
                    taskDescription.classList.toggle("done")
                });

                tasks_container.appendChild(taskDiv);

                topDiv.appendChild(taskTitle);
                middleDiv.appendChild(taskDescription);
                bottomDiv.appendChild(changeStatusButton);
                bottomDiv.appendChild(deleteButton);
                taskDiv.appendChild(topDiv);
                taskDiv.appendChild(middleDiv);
                taskDiv.appendChild(bottomDiv);

            });
        });
    });
}

reload();

add_task_btn.addEventListener("click", e => {
    add_window.classList.toggle("hidden");
});

submit_task_btn.addEventListener("click", e => {
    const data = new FormData();
    data.append("title", title_input.value);
    data.append("description", description_input.value);
    fetch("http://localhost/To-do/tasks", {
        method: "POST",
        body: data,
    });

    title_input.value = "";
    description_input.value = "";
    add_window.style.display = "none";
    tasks_container.innerHTML = "";
    reload();
});