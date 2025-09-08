let tasks = [];
let defaultMessage = document.getElementById("default-message");
let defaultMessageConcluded = document.getElementById("default-message-concluded");
let container = document.getElementById("container-tasks");
let listConcluded = document.getElementById("list-concluded-tasks");
let containerConcluded = document.getElementById("list-concluded-tasks");

function updateDefaultMessage() {
    defaultMessage.style.display = container.children.length === 0 ? "flex" : "none";
    defaultMessageConcluded.style.display = listConcluded.children.length === 0 ? "flex" : "none" ; 
}

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

  let priorityColor = ""

  switch(taskPriority){
    case "Alta" : priorityColor = "tooltip-high"; break;
    case "Média" : priorityColor = "tooltip-medium"; break;
    case "Baixa" : priorityColor = "tooltip-low"; break;
  }

  let [year, month, day] = inputDate.split("-");
  let taskDateFormatted = `${day}/${month}/${year}`;

  let newTask = document.createElement("li");
  newTask.classList.add("card-task");
  newTask.innerHTML = `
              <div class="taskTitle">
                <h3>${taskName}</h3>
                <div class="tooltip ${priorityColor}">
                  <span class="tooltiptext ${priorityColor}">${taskPriority}</span>
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

  const deleteButton = newTask.querySelector(".delete-button");
  deleteButton.addEventListener("click", function(){
    newTask.remove();
    updateDefaultMessage();
  })

  const concludedButton = newTask.querySelector(".concluded-button");
  concludedButton.addEventListener("click", function(){
    newTask.classList.remove("card-task");
    newTask.classList.add("card-concluded-task");
    updateDefaultMessage();
  })

  containerConcluded.appendChild(newTask)


  const taskObject = {taskName, taskPriority, taskPriority, taskType, taskDescription}
  tasks.push(taskObject);
  console.log(tasks)
  
  
  
  container.appendChild(newTask);
  updateDefaultMessage();

  document.getElementById("taskName").value = "";
  document.getElementById("taskPriority").value = "";
  document.getElementById("taskType").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskDescription").value = "";
}

function deleteTask(element){
  element.closest("li.card-task").remove();
  updateDefaultMessage();
}

updateDefaultMessage();