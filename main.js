let add = document.getElementById("add");
let menuCreateBtn = document.getElementById("menu-create");
let collapsible = document.getElementById("collapsible");
let collapseFlag = 0;
let title = document.getElementById("create-to-do-title");
let details = document.getElementById("create-to-do-details");
let category = document.getElementById("create-to-do-category");
let tags = document.getElementById("create-to-do-tags");
let toDoCount = document.getElementById("display-count");
let cardContainer = document.getElementById("card-container");
let tasksToDos = [];
let isMobile = 0;
//  weekday: "long",
const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
};

if ("maxTouchPoints" in navigator) {
    isMobile = navigator.maxTouchPoints > 0;
}

//mobile-only
menuCreateBtn.addEventListener("click", () => {
    if (!collapseFlag) {
        collapseFlag = 1;
        collapsible.style.display = "block";
        menuCreateBtn.innerText = "Close";
    } else {
        collapseFlag = 0;
        collapsible.style.display = "none";
        menuCreateBtn.innerText = "Create";
    }
});

add.addEventListener("click", () => {
    if (readyToSubmit(title, details, category, tags)) {
        let toDoObj = {
            id: "card-no-" + tasksToDos.length,
            title: title.value,
            details: details.value,
            category: category.value,
            tags: tags.value.split(",")
        }
        console.log(toDoObj);
        tasksToDos.unshift(toDoObj);
        addNewToDo(toDoObj);
        resetValues(title, details, category, tags);
        if (isMobile) {
            menuCreateBtn.click();
        }
    } else {
        alert("Please fill all the details");
    }
});

function addNewToDo(toDoObj) {
    toDoCount.innerText = parseInt(toDoCount.innerText) + 1;

    let demoCard = jQuery("#demo-card");
    //id=${"card-no-"+tasksToDos.length}
    demoCard.after(`
  <div class="card" id=${toDoObj.id}>
    <div class="card-status">
      <button class="status in-progress" onclick='changeStatus(this);'>In Progress</button>
      <span class="material-symbols-outlined close" onclick='deleteCard(this);'>close</span>
    </div>
    <div class="card-title">${toDoObj.title}</div>
    <div class="card-date">${new Date().toLocaleString("en", options)}</div>
    <div class="card-desc">${toDoObj.details}</div>
    <div class="card-category-div">
        <div class="card-category-title">Category</div>
        <div class="card-category">${toDoObj.category}</div>
    </div>
    <div class="card-tag-div">
        <div class="card-tag-title">Tags</div>
         ${createTags(toDoObj.tags)}
     </div> 
  </div>
  `)
}

function deleteCard(element) {
    element = element.parentNode.parentNode;
    //let todo = tasksToDos.find(o => o.id === element.id);
    tasksToDos = tasksToDos.filter(todo => todo.id != element.id);
    element.remove();
    toDoCount.innerText = tasksToDos.length;
}
function changeStatus(element) {
    if (element.classList.contains("in-progress")) {
        element.classList.remove("in-progress");
        element.classList.add("complete");
        element.innerText = "COMPLETE"
    } else {
        element.classList.remove("complete");
        element.classList.add("in-progress");
        element.innerText = "IN PROGRESS"
    }
}
function createTags(tags) {
    let tagString = "";
    for (tag of tags) {
        tagString += `<span class="card-tag">${tag}</span>`;
    }
    return tagString;
}
function readyToSubmit(...elements) {
    for (element of elements) {
        if (element.value.trim() == "") {
            return false;
        };
    }
    return true;
}
function resetValues(...elements) {
    for (element of elements) {
        element.value = "";
    }
}