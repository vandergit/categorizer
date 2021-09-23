const draggables = document.querySelectorAll(".draggable");
const ulContainers = document.querySelectorAll(".list-items");

// goes through all the elements with class .draggable and adds class dragging to it
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  // when the item is done dragging we remove the class dragging
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    let user = draggable.id;
    let newVal = 0;
    // Check  what category is in then change category the id in the database to match the category it's in
    if (draggable.parentElement.classList[1] === "books") {
      newVal = 3;
    } else if (draggable.parentElement.classList[1] === "movies") {
      newVal = 1;
    } else if (draggable.parentElement.classList[1] === "restaurants") {
      newVal = 2;
    } else if (draggable.parentElement.classList[1] === "things") {
      newVal = 4;
    }
    editItem(newVal, user);
  });
});

// Here we add which ever list item that was being dragged to the category it got dragged to
ulContainers.forEach((ulContainer) => {
  ulContainer.addEventListener("dragover", (e) => {
    e.preventDefault;
    const draggable = document.querySelector(".dragging");
    ulContainer.appendChild(draggable);
  });
});

// Here we're listening for when the item starts to dragged and see if wants to go above or under another element
ulContainers.forEach((ulContainer) => {
  ulContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(ulContainer, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement === null) {
      ulContainer.appendChild(draggable);
    } else {
      ulContainer.insertBefore(draggable, afterElement);
    }
  });
});

// Here it gets all the ones we're not dragging that way it knows if it wants to go up or bottom of an li
const getDragAfterElement = (ulContainer, y) => {
  const draggableElements = [
    ...ulContainer.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

// This is the request that sends the new id for category and the item id to the database
const editItem = (newVal, user) => {
  $.ajax({
    type: "PUT",
    url: "/categories/edit",
    data: { category_id: newVal, item_id: user },
  }).then((res) => {
    console.log("this is the response from app=>>>>");
  });
};

// Here we tell the database which elements got deleted
const deleteItem = (activity) => {
  $.ajax({
    type: "POST",
    url: "/categories/delete",
    data: { activity_id: activity },
  }).then((res) => {
    console.log("this is a deletion");
  });
};

// This listens for when an item gets deleted then removes it
const allListItems = document.querySelectorAll(".delete");
for (let index = 0; index < allListItems.length; index++) {
  allListItems[index].addEventListener("click", function () {
    deleteItem(allListItems[index].id);
    this.classList.toggle("active");
  });
  allListItems[index]
    .querySelector("#delete")
    .addEventListener("click", function () {
      this.closest(".delete").remove();
    });
}
