function addTask() {
  let taskName = document.getElementById("taskName").value;
  let taskPriority = document.getElementById("taskPriority").value;
  let taskType = document.getElementById("taskType").value;
  let taskDate = document.getElementById("taskDate").value;
  let taskDescription = document.getElementById("taskDescription").value;

  if(!taskName || !taskPriority || !taskType || !taskDate || !taskDescription){
    alert("Preencha todos os campos da tarefa!");
    return;
  }
  let newTask = document.createElement("div");
  newTask.classList.add("card-task");
  container = document.getElementById("container-tasks");
  newTask.innerHTML = `
              <div class="taskTitle">
                <h3>${taskName}</h3>
                <div class="tooltip">
                  <span class="tooltiptext">${taskPriority}</span>
                </div>
              </div>              
              <p class="task-date">Data limite:  ${taskDate}</p>
              <p class="task-description">${taskDescription}</p>
              <p class="task-type">${taskType}</p>
              <div class="task-card-buttons">
                <button class="concluded-button">Concluir</button>
                <button class="delete-button">Deletar</button>
              </div>
            `;
  container.append(newTask);
}
