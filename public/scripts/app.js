const draggables = document.querySelectorAll(".draggable");
const ulContainers = document.querySelectorAll(".list-items");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    // console.log("--------",draggable.id);
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    // console.log("!!!!!!!!",draggable.parentElement.classList);
    let user = draggable.id;
    let newVal = 0;
    if (draggable.parentElement.classList[1] === 'books') {
      newVal = 3;
    } else if (draggable.parentElement.classList[1] === 'movies') {
      newVal = 1;
    } else if (draggable.parentElement.classList[1] === 'restaurants') {
      newVal = 2;
    } else if (draggable.parentElement.classList[1] === 'things') {
      newVal = 4;
    }
    // console.log("NEEEEEW",newVal, user);
    editItem(newVal, user);
  });
});

ulContainers.forEach((ulContainer) => {
  //console.log(ulContainer);
  ulContainer.addEventListener("dragover", (e) => {
    e.preventDefault;
    const draggable = document.querySelector(".dragging");
    //console.log(draggable);

    ulContainer.appendChild(draggable);
    //console.log(ulContainer.classList);

    let x = ulContainer.classList;

    console.log("value", draggable.textContent);
    //console.log("after:",draggable.id);
  });
});

const editItem = (newVal, user) => {
  // console.log('!!!!!!!!!!!!!!!!!!!!', newVal);
  $.ajax({ type: "PUT", url: "/categories/edit" , data: {category_id: newVal,
    item_id: user}})
    .then((res) => {
      console.log("this is the response from app=>>>>");
    }
    );
};

const deleteItem = (activity) => {
  $.ajax({ type: "POST", url: "/categories/delete" , data: {activity_id: activity}})
    .then((res) => {
      console.log("this is a deletion");
    }
    );
};

const allListItems = document.querySelectorAll(".delete");
for (let index = 0; index < allListItems.length; index++) {
  allListItems[index].addEventListener("click", function() {
    // console.log('allListItems id',  allListItems[index].id);
    deleteItem(allListItems[index].id);
    this.classList.toggle("active");
  });
  allListItems[index]
  .querySelector("#delete")
  .addEventListener("click", function() {
    this.closest(".delete").remove();
  });
}

