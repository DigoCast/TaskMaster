let tasks = [];
let defaultMessage = document.getElementById("default-message");
let defaultMessageConcluded = document.getElementById("default-message-concluded");
let container = document.getElementById("container-tasks");
let listConcluded = document.getElementById("list-concluded-tasks");

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
  newTask.setAttribute("data-priority", taskPriority); 
  newTask.setAttribute("data-type", taskType);
  newTask.innerHTML = `
              <div class="upper">
                <div class="taskTitle">
                  <h3>${taskName}</h3>
                  <div class="tooltip ${priorityColor}">
                    <span class="tooltiptext ${priorityColor}">${taskPriority}</span>
                  </div>
                </div>              
                <p class="task-date">Data limite: ${taskDateFormatted}</p>
                <p class="task-description">${taskDescription}</p>
                <p class="task-type">${taskType}</p>
              </div>
              <div class="task-card-buttons">
                <button class="concluded-button">Concluir</button>
                <button class="delete-button">Deletar</button>
              </div>
            `;

  const deleteButton = newTask.querySelector(".delete-button");
  deleteButton.addEventListener("click", function(){
    newTask.remove();
    updateDefaultMessage();
    applyFilters(); 
  })

  const concludedButton = newTask.querySelector(".concluded-button");
  concludedButton.addEventListener("click", function(){
    newTask.remove();

    newTask.classList.remove("card-task");
    newTask.classList.add("card-concluded-task");
  
    listConcluded.appendChild(newTask);
    updateDefaultMessage();

    const newButton = newTask.querySelector(".concluded-button");
    if (newButton) {
        newButton.textContent = "Concluída";
        newButton.classList.add("concluded-button-conclu");
        newButton.classList.remove("concluded-button");
        newButton.disabled = true;
    }
  })

  const taskObject = {taskName, taskPriority, taskType, taskDescription};
  tasks.push(taskObject);

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

function applyFilters() {
    const priorityValue = document.getElementById('priorityFilterDropdown').value;
    const categoryValue = document.getElementById('categoryFilterDropdown').value;
    
    const tasksToFilter = document.querySelectorAll("#container-tasks > li.card-task");

    tasksToFilter.forEach(task => {
        const taskPriority = task.getAttribute("data-priority");
        const taskCategory = task.getAttribute("data-type");

        const priorityMatch = (priorityValue === "all") || (taskPriority === priorityValue);
        const categoryMatch = (categoryValue === "all") || (taskCategory === categoryValue);

        if (priorityMatch && categoryMatch) {
            task.style.display = ""; 
        } else {
            task.style.display = "none"; 
        }
    });
}

document.getElementById('priorityFilterDropdown').addEventListener('change', applyFilters);
document.getElementById('categoryFilterDropdown').addEventListener('change', applyFilters);