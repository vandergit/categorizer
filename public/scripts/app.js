const draggables = document.querySelectorAll(".draggable");
const ulContainers = document.querySelectorAll(".list-items");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

ulContainers.forEach((ulContainer) => {
  ulContainer.addEventListener("dragover", (e) => {
    e.preventDefault;
    const draggable = document.querySelector(".dragging");
    ulContainer.appendChild(draggable);
  });
});

const allListItems = document.querySelectorAll(".delete");
for (let index = 0; index < allListItems.length; index++) {
  allListItems[index].addEventListener("click", function() {
    this.classList.toggle("active");
  });
  allListItems[index]
    .querySelector("#delete")
    .addEventListener("click", function() {
      this.closest(".delete").remove();
    });
}
