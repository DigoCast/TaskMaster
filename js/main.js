let tasks = []

function addTask() {
  let taskName = document.getElementById("taskName").value;
  let taskPriority = document.getElementById("taskPriority").value;
  let taskType = document.getElementById("taskType").value;
  let inputDate = document.getElementById("taskDate").value;
  let taskDescription = document.getElementById("taskDescription").value;

  if ( !taskName || !taskPriority || !taskType || !inputDate || !taskDescription ) {
    alert("Preencha todos os campos da tarefa!");
    return;
  }

  let taskDateDay = inputDate.split("-")[2];
  let taskDateMonth = inputDate.split("-")[1];
  let taskDateYear = inputDate.split("-")[0];
  let taskDateFormatted = `${taskDateDay}/${taskDateMonth}/${taskDateYear}`

  let newTask = document.createElement("li");
  newTask.classList.add("card-task");
  container = document.getElementById("container-tasks");
  newTask.innerHTML = `
              <div class="taskTitle">
                <h3>${taskName}</h3>
                <div class="tooltip">
                  <span class="tooltiptext">${taskPriority}</span>
                </div>
              </div>              
              <p class="task-date">Data limite: ${taskDateFormatted}</p>
              <p class="task-description">${taskDescription}</p>
              <p class="task-type">${taskType}</p>
              <div class="task-card-buttons">
                <button class="concluded-button">Concluir</button>
                <button class="delete-button">Deletar</button>
              </div>
            `;

  const taskObject = {taskName, taskPriority, taskType, taskDescription} // Adicionar data
  const deleteButton = newTask.querySelector(".delete-button");
  deleteButton.addEventListener("click", function(){
    newTask.remove();
  })

  container.appendChild(newTask);

  document.getElementById("taskName").value = "";
  document.getElementById("taskPriority").value = "";
  document.getElementById("taskType").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskDescription").value = "";
}

function deleteTask(element){
  element.closest("li.card-task").remove();
}