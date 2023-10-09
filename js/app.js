// CONTAINER_BODY

const cardContainer = document.querySelector("#container__body");

//load items
window.addEventListener("DOMContentLoaded", function () {
  createTodos(todos);
});

const createTodos = (arr) => {
  // PARSING JSON DATA
  let arrStr = JSON.parse(arr);

  // Function to create the HTML Todo Cards based on given arguments

  function generateTodo(arr) {
    return arr
      .map((item) => {
        const formattedTodoDate = calculateFormattedDate(item.days);

        let priorityBgColor = "#8ac926";

        if (item.priority <= 1) {
          priorityBgColor = "#8ac926";
        } else if (item.priority <= 3) {
          priorityBgColor = "#ffca3a";
        } else {
          priorityBgColor = "#ff595e";
        }

        return `<div class="col mb-3"><div class="todotask__card">
              <div class="card__deleted">
                <p>Do you really want to delete "${item.name}"?</p>
                <div class="card_delete_buttons">
                  <button class="delete-btn" title="deleteYesBtn">Yes</button>
                  <button class="delete-btn" title="deleteNoBtn">No</button>
                </div>
              </div>
              <div class="card__completed">
                <i class="fa-regular fa-circle-check" style="color: #ffffff;"></i>
                <h3 class="completed_heading">Completed</h3>
              </div>
            <div class="card__header">
              <div class="card__header_task">
                <span>Task</span>
              </div>
              <div class="card__header_icons">
                <a href="#" aria-label="Bookmark task"><i class="fa-regular fa-bookmark"></i></a>
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
            <div class="card__main">
              <img
                src=${item.image}
                alt=${item.name}
              />
              <h4>${item.name}</h4>
              <p>
                ${item.description}
              </p>
              <hr />
            </div>
            <div class="card__info">
              <div class="card__info_priority">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span
                  >Priority level: 
                  <button class="priority_level_down"
                      >-</button>
                  <span class="priority_level" style="background-color: ${priorityBgColor};">${item.priority}</span>
                  <button class="priority_level_up"
                    >+</button>
                </span
                >
              </div>
              <div class="card__info_deadline">
                <i class="fa-regular fa-calendar-days"></i>
                <span
                  >Deadline:
                  <span id="deadline_date">${formattedTodoDate}</span></span
                >
              </div>
              <hr />
            </div>
            <div class="card__buttons" title="deleteButton">
              <button class="button_delete">
                <i class="fa-solid fa-trash-can" style="color: #ffffff"></i>
                Delete
              </button>
              <button class="button_done" title="doneButton">
                <i
                  class="fa-regular fa-circle-check"
                  style="color: #ffffff"
                ></i>
                Done
              </button>
            </div>
          </div></div>`;
      })
      .join("");
  }

  // function to create a new Date for Deadlines

  function calculateFormattedDate(days) {
    let currentTime = Date.now();
    const today = new Date(currentTime);
    today.setDate(today.getDate() + parseInt(days));
    return today.toLocaleDateString();
  }

  // default todo items

  let displayDefaultTodo = generateTodo(arrStr);
  cardContainer.innerHTML = displayDefaultTodo;
  attachButtonListeners(arrStr);

  // filter items

  const filterBtn = document.getElementById("select_priority");
  const filterIcon = document.getElementById("filter-icon");

  filterBtn.addEventListener("change", function (e) {
    // VARIABLES for ASCENDING and DESCENDING new array
    let ascendingArr = arrStr.slice().sort((a, b) => a.priority - b.priority);
    let descendingArr = arrStr.slice().sort((a, b) => b.priority - a.priority);
    // GENERATING Todo cards based on default or clicked button
    if (e.currentTarget.value === "Ascending") {
      filterIcon.classList = "fa-solid fa-arrow-down-short-wide";
      cardContainer.innerHTML = "";
      let displayAscendingTodo = generateTodo(ascendingArr);
      cardContainer.innerHTML = displayAscendingTodo;
      attachButtonListeners(ascendingArr);
    } else if (e.currentTarget.value === "Descending") {
      filterIcon.classList = "fa-solid fa-arrow-down-wide-short";
      cardContainer.innerHTML = "";
      let displayDescendingTodo = generateTodo(descendingArr);
      cardContainer.innerHTML = displayDescendingTodo;
      attachButtonListeners(descendingArr);
    } else {
      filterIcon.classList = "";
      cardContainer.innerHTML = "";
      let displayDefaultTodo = generateTodo(arrStr);
      cardContainer.innerHTML = displayDefaultTodo;
      attachButtonListeners(arrStr);
    }
  });

  // attaching EVENT LISTENERS to default and new arrays

  function attachButtonListeners(arr) {
    // DECLARATION OF PRIORITY buttons
    const priorityBtns = document.querySelectorAll(".priority_level");
    const increaseBtn = document.querySelectorAll(".priority_level_up");
    const decreaseBtn = document.querySelectorAll(".priority_level_down");

    increaseBtn.forEach((btn, i) => {
      btn.addEventListener("click", function () {
        changePriorityLevel(i, "ADD");
        changeColorOfPriority(i);
      });
    });

    decreaseBtn.forEach((btn, i) => {
      btn.addEventListener("click", function () {
        changePriorityLevel(i, "SUBTRACT");
        changeColorOfPriority(i);
      });
    });

    const changePriorityLevel = (index, operation) => {
      if (operation === "ADD" && arr[index].priority < 5) {
        arr[index].priority++;
      } else if (operation === "SUBTRACT" && arr[index].priority > 0) {
        arr[index].priority--;
      }
      priorityBtns[index].innerHTML = arr[index].priority;
    };

    const changeColorOfPriority = (index) => {
      // background-color logic (works when page loaded and after sorting is applied)
      // background-color logic when sorting is applied is in the generateTodo function
      let currentPriority = arr[index].priority;

      if (currentPriority <= 1) {
        priorityBtns[index].style.backgroundColor = "#8ac926";
      } else if (currentPriority <= 3) {
        priorityBtns[index].style.backgroundColor = "#ffca3a";
      } else {
        priorityBtns[index].style.backgroundColor = "#ff595e";
      }
    };

    // DECLARATION OF DELETE/DONE buttons

    const deleteBtns = document.querySelectorAll(".button_delete");
    const doneBtns = document.querySelectorAll(".button_done");

    deleteBtns.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        // selecting the deleted div
        const cardDeleteDiv = btn
          .closest(".todotask__card")
          .querySelector(".card__deleted");
        const currentTask = btn.closest(".todotask__card");
        cardDeleteDiv.style.visibility = "visible";
        cardDeleteDiv.style.opacity = "1";
        cardDeleteDiv.style.height = "100%";
        currentTask.classList.add("todo__opacity");
        // deleting the item
        const onDeleteAnswerBtns = btn
          .closest(".todotask__card")
          .querySelectorAll(".delete-btn");
        onDeleteAnswerBtns.forEach(function (delBtn) {
          delBtn.addEventListener("click", function () {
            if (delBtn.textContent === "Yes") {
              arr.splice(i, 1);
              cardContainer.innerHTML = "";
              let displayCurrentTodoList = generateTodo(arr);
              cardContainer.innerHTML = displayCurrentTodoList;
              attachButtonListeners(arr);
            } else {
              cardDeleteDiv.style.visibility = "hidden";
              cardDeleteDiv.style.opacity = "0";
              cardDeleteDiv.style.height = "0%";
              currentTask.classList.remove("todo__opacity");
            }
          });
        });
      });
    });

    doneBtns.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        // setting background color to green on "done" button press
        const currentTask = btn.closest(".todotask__card");
        currentTask.classList.add("todo__opacity");
        currentTask.style.backgroundColor = "#8ac9263e";
        // visibility property change to visible on "done" button press
        const cardCompletedDiv = btn
          .closest(".todotask__card")
          .querySelector(".card__completed");
        cardCompletedDiv.style.visibility = "visible";
        cardCompletedDiv.style.opacity = "1";
        cardCompletedDiv.style.height = "100%";
      });
    });
  }
};
