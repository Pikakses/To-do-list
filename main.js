add_task_btn = document.getElementById("add-task");
submit_task_btn = document.getElementById("submit-task");
add_window = document.querySelector(".add_window");

title_input = document.getElementById("title");
description_input = document.getElementById("description");

tasks_container = document.getElementById("tasks-container");

fetch("http://localhost/To-do/tasks", {
    method: "GET",
})
.then(res => {
    res.text()
    .then((data) => {
        console.log(data);
        data = JSON.parse(data);
        data.forEach(task => {
            taskDiv = document.createElement("div");
            taskDiv.className = "task-item";

            topDiv = document.createElement("div");
            topDiv.className = "horizontal-task-div";
            
            taskTitle = document.createElement("p");
            taskTitle.textContent = task.title;
            taskTitle.className = "task-title";

            middleDiv = document.createElement("div");
            middleDiv.className = "horizontal-task-div";

            bottomDiv = document.createElement("div");
            bottomDiv.className = "horizontal-task-div change-status-div";

            taskDescription = document.createElement("p");
            taskDescription.textContent = task.description;
            taskDescription.className = "task-description";

            deleteButton = document.createElement("div");
            deleteButton.className = "delete-button";

            deleteButton.addEventListener("click", e => {
                fetch(`http://localhost/To-do/tasks/${task.id}`, {
                    method: "DELETE",
                });
                location.reload();
            });

            changeStatusButton = document.createElement("button");
            changeStatusButton.className = "change-status";
            changeStatusButton.textContent = "Zmień Status";
            changeStatusButton.addEventListener("click", e => {
                fetch(`http://localhost/To-do/tasks/${task.id}`, {
                    method: "PUT",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', },
                    body: JSON.stringify({status: task.status}),
                });
                taskTitle.classList.toggle("done");
            });

            tasks_container.appendChild(taskDiv);

            topDiv.appendChild(taskTitle);
            topDiv.appendChild(deleteButton);
            middleDiv.appendChild(taskDescription);
            bottomDiv.appendChild(changeStatusButton);
            taskDiv.appendChild(topDiv);
            taskDiv.appendChild(middleDiv);
            taskDiv.appendChild(bottomDiv);

        });
    });
});

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

    location.reload();

    title_input.value = "";
    description_input.value = "";
    add_window.style.display = "none";
});