let todolistsArray = [];
function Todolist(name, points, index) {
	this.name = name;
	this.points = points;
	this.index = index;
}
function Point(textContent, isCrossedOut, index) {
	this.textContent = textContent;
	this.isCrossedOut = isCrossedOut;
	this.index = index;
}
Point.prototype.crossOut = function () {
	//  removes the :before box from the point
	//  draws an :after line over the current point in dom
	//  grays out point and line color
	//  changes the isCrossedOut property of the object to true
	//  updateLocalStorage
};

//Site loads:
if (localStorage.getItem("todolistsArray") !== null) {
	todolistsArray = JSON.parse(localStorage.getItem("todolistsArray"));
	//    addNameSidebar() for each todolist in the array
}
/* local storage test */
console.log(todolistsArray[0].points[0].textContent);

// ---

const addTodolistButton = document.querySelector("#addButton");
addTodolistButton.addEventListener("click", () => {
	let modalBox = displayModal();
	modalBox.innerHTML = `
    <form>
        <input type=text id="nameFromModal" name="name" placeholder="Enter name">
        <div id="modalButtons">
            <button class=cancel>Cancel</button>
            <button class=apply>Add todolist</button>
        </div>
    </form>
    `;
	//    cancel eventListener - removeModal()
	//    add button eventListener:
	//      createTodolist();
	//      updateLocalStorage();
	//      removeModal();
	//      displayNote();
});

function displayModal() {
	let grayBg = document.createElement("div");
	grayBg.classList.toggle("grayBg");
	document.body.append(grayBg);
	const modalBox = document.createElement("div");
	modalBox.classList.toggle("modalBox");
	grayBg.appendChild(modalBox);
	grayBg.addEventListener("mousedown", removeModal);
	document.addEventListener("keydown", removeModal);
	return modalBox;
	/*add to CSS:
#grayBg {
	background-color: rgba(0, 0, 0, 0.281);
	position: fixed;
	inset: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
}
#modalBox {
	background-color: white;
	border-radius: 20px;
	padding: 50px;
}
*/
}
function removeModal(e) {
	grayBg = document.querySelector(".grayBg");
	if (e.target === grayBg || e.key === "Escape") {
		document.body.removeChild(grayBg);
		document.removeEventListener("keydown", removeModal);
	}
}

// ---

//createTodolist():
//  Adds todolist object to the array
//  Adds name to the todolist object
//  addIndex();
//  addNameSidebar();

//addNameSidebar():
//  Removes add button
//  Appends the note at the end
//  Readds add button
//  Adds eventlistener to displayTodolist()

function updateLocalStorage() {
	localStorage.setItem("todolistsArray", JSON.stringify(todolistsArray));
}

// ---

//displayTodolist():
//  removes todolist display if it's currently displayed
//  draws title from title property
//  addPoint() for each point in the array if there are any
//  draws addPoint button
//    addPointButton.addEventListener pointPrompt();
//...
//  title and points are editable on click:
//    saves changes to the object properties
//    updateLocalStorage()

//pointPrompt():
//  let box = displayModal();
//  append the ask for the name of the point in box
//  append cancel button in box
//    cancel eventListener - removeModal()
//  append add button in box
//    add button eventlistener - addPoint()

//addPoint():
// draws the new point
// adds event listener for crossOutPoint() to the :before box next to the point
// runs crossOut() method for points that have isCrossedOut: true
// saves changes to the object properties
// updateLocalStorage

// ---

//addObjectIndex(arrayWithObject, object, propertyToCheck, indexAlreadyExists):
//  if object.index property already exists AND indexAlreadyExists !== true:
//      RETURN console.err(".index property of the object already exists. Index wasn't assigned. If you want to assign it anyway, pass true as 4th argument to this function.)
//  iterate through elements of the array, for each:
//    if propertyToCheck in the given element === propertyToCheck in the passed object:  //for example if objectInTheArray.name === object.name
//      objectIndexProperty = index in the array of the object that matched
//      return objectIndexProperty  //returns the index of the array that matched
//    else RETURN console.err("propertyToCheck of passed object didn't match with any object in arrayWithObject. Index wasn't assigned.")

// ---

//Delete all todolists button is clicked:
//  localStorage.removeItem("todolistsArray");
//  Refreshes the page

/* --- TODO --- */

//Trash button when you hover on the sidebar

//if todolist has any points and all are crossed it shows a checkmark next to the title and the names in the sidebar
