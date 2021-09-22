const draggables = document.querySelectorAll(".draggable");
const ulContainers = document.querySelectorAll(".list-items");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    let user = draggable.id;
    let newVal = 0;
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

ulContainers.forEach((ulContainer) => {
  ulContainer.addEventListener("dragover", (e) => {
    e.preventDefault;
    const draggable = document.querySelector(".dragging");
    ulContainer.appendChild(draggable);
  });
});

const editItem = (newVal, user) => {
  console.log("!!!!!!!!!!!!!!!!!!!!", newVal);
  $.ajax({
    type: "PUT",
    url: "/categories/edit",
    data: { category_id: newVal, item_id: user },
  });
};

const allListItems = document.querySelectorAll(".delete");
for (let index = 0; index < allListItems.length; index++) {
  allListItems[index].addEventListener("click", function () {
    this.classList.toggle("active");
  });
  allListItems[index]
    .querySelector("#delete")
    .addEventListener("click", function () {
      this.closest(".delete").remove();
    });
}
