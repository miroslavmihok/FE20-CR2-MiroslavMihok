// ADDING TODO to CONTAINER_BODY

const cardContainer = document.querySelector("#container__body");

//load items
window.addEventListener("DOMContentLoaded", function () {
  createTodos(todos);
});

const createTodos = (arr) => {
  // PARSING JSON DATA and displaying CONTENT
  let arrStr = JSON.parse(arr);

  console.log(arrStr);

  let displayTodo = arrStr.map((item) => {
    let currentTime = Date.now();
    const today = new Date(currentTime);
    today.setDate(today.getDate() + parseInt(item.days));
    const formattedTodoDate = today.toLocaleDateString();

    return `<div class="col mb-3"><div class="todotask__card">
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
              >Priority level: <span class="priority_level">${item.priority}</span></span
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
  });
  displayTodo = displayTodo.join("");
  cardContainer.innerHTML = displayTodo;

  // filter items

  const filterBtn = document.getElementById("select_priority");
  const filterIcon = document.getElementById("filter-icon");

  filterBtn.addEventListener("change", function (e) {
    let ascendingArr = arrStr.slice().sort((a, b) => a.priority - b.priority);
    let descendingArr = arrStr.slice().sort((a, b) => b.priority - a.priority);
    if (e.currentTarget.value === "Ascending") {
      filterIcon.classList = "fa-solid fa-arrow-down-short-wide";
      cardContainer.innerHTML = "";
      arrStr = ascendingArr.map((item) => {
        let currentTime = Date.now();
        const today = new Date(currentTime);
        today.setDate(today.getDate() + parseInt(item.days));
        const formattedTodoDate = today.toLocaleDateString();

        return `<div class="col mb-3"><div class="todotask__card">
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
                  >Priority level: <span class="priority_level">${item.priority}</span></span
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
      });
      arrStr = arrStr.join("");
      cardContainer.innerHTML = arrStr;
    } else if (e.currentTarget.value === "Descending") {
      filterIcon.classList = "fa-solid fa-arrow-down-wide-short";
      cardContainer.innerHTML = "";
      let newArr = descendingArr.map((item) => {
        let currentTime = Date.now();
        const today = new Date(currentTime);
        today.setDate(today.getDate() + parseInt(item.days));
        const formattedTodoDate = today.toLocaleDateString();

        return `<div class="col mb-3"><div class="todotask__card">
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
                  >Priority level: <span class="priority_level">${item.priority}</span></span
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
      });
      arrStr = arrStr.join("");
      cardContainer.innerHTML = arrStr;
    }
  });

  // DECLARATION OF BUTTONS

  const priorityBtns = document.querySelectorAll(".priority_level");

  priorityBtns.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      increasePriority(i);

      // background-color logic
      let currentPriority = arrStr[i].priority;

      if (currentPriority <= 1) {
        btn.style.backgroundColor = "#8ac926";
      } else if (currentPriority <= 3) {
        btn.style.backgroundColor = "#ffca3a";
      } else {
        btn.style.backgroundColor = "#ff595e";
      }
    });
  });

  // increase priority logic
  function increasePriority(index) {
    if (arrStr[index].priority < 5) {
      arrStr[index].priority++;
    }
    priorityBtns[index].innerHTML = arrStr[index].priority;
  }
};
