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

function updateLocalStorage() {
	localStorage.setItem("todolistsArray", JSON.stringify(todolistsArray));
}

const addTodolistButton = document.querySelector("#addButton");
addTodolistButton.addEventListener("click", () => {
	let modalBox = displayModal();
	modalBox.innerHTML = `
    <div>
        <input type=text id="nameFromModal" name="name" placeholder="Enter name">
        <div id="modalButtons">
            <button class="cancel">Cancel</button>
            <button class="confirm">Add todolist</button>
        </div>
    </div>
    `;
	let confirmButton = document.querySelector(".confirm");
	confirmButton.addEventListener("click", (e) => {
		e.preventDefault();
		let nameInputField = document.querySelector("#nameFromModal");
		let enteredName = nameInputField.value;
		if (enteredName !== "") {
			createTodolist(enteredName);
			updateLocalStorage();
			displayTodolist(todolistsArray.length - 1);
			removeModal(e);
		}
	});
	let cancelButton = document.querySelector(".cancel");
	cancelButton.addEventListener("click", removeModal);
});

function displayModal() {
	let grayBg = document.createElement("div");
	grayBg.classList.toggle("grayBg");
	document.body.append(grayBg);
	const modalBox = document.createElement("div");
	modalBox.classList.toggle("modalBox");
	grayBg.appendChild(modalBox);
	grayBg.addEventListener("mousedown", (e) => {
		removeModal(e, "backgroundClick");
	});
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
function removeModal(e, type) {
	grayBg = document.querySelector(".grayBg");
	if (
		//if (the event listener passed e* AND key clicked AND if it wasn't escape) OR (it was a mouseclick and somewhere else than the gray background was clicked)
		//*this check allows to call removeModal() without passing e, otherwise it errors out when checking e.key
		(typeof e !== "undefined" && typeof e.key !== "undefined" && e.key !== "Escape") ||
		(type === "backgroundClick" && e.target !== grayBg)
	) {
		return;
	} else {
		document.body.removeChild(grayBg);
		document.removeEventListener("keydown", removeModal);
	}
}
function createTodolist(enteredName) {
	todolistsArray.push(new Todolist(enteredName, [], todolistsArray.length));
	addNameSidebar(enteredName);
}

function addNameSidebar(name) {
	const sidebar = document.querySelector("#sidebar");
	sidebar.removeChild(addTodolistButton);
	const sideName = document.createElement("p");
	sideName.textContent = name;
	sidebar.appendChild(sideName);
	sidebar.appendChild(addTodolistButton);
	sideName.addEventListener("click", () => {
		for (let i = 0; i < todolistsArray.length; i++) {
			if (todolistsArray[i].name === name) {
				displayTodolist(i);
			}
		}
	});
}
function displayTodolist(index) {
	const body = document.querySelector("Body");
	const todolistDisplay = document.createElement("div");
	todolistDisplay.setAttribute("id", "todolist");
	todolistDisplay.innerHTML = `
        <h2 class="title">${todolistsArray[index].name}</h2>
        <div class="tasks">
        </div>
        <button id="addPointButton">+</button>
    `;
	if (elementExists("todolist") === true) {
		let todolistForRemoval = document.querySelector("#todolist");
		todolistForRemoval.remove();
	}
	body.appendChild(todolistDisplay);
	let todolistTitle = document.querySelector(".title");
	enableTextEditing(todolistTitle);
	addExistingPoints(index);
	const addPointButton = document.querySelector("#addPointButton");
	addPointButton.addEventListener("click", () => {
		pointPrompt(index);
	});
	//TODO: title and points are editable on click:
	//    saves changes to the object properties
	//    when name changed, changes the name on the sidebar
	//    updateLocalStorage()
}
function elementExists(elementId) {
	var element = document.getElementById(elementId);
	return element !== null;
}
function addExistingPoints(todolistIndex) {
	for (let i = 0; i < todolistsArray[todolistIndex].points.length; i++) {
		displayPoint(todolistIndex, todolistsArray[todolistIndex].points[i].index);
	}
}
function pointPrompt(todolistIndex) {
	let modalBox = displayModal();
	modalBox.innerHTML = `
    <div>
        <input type=text id="nameFromModal" name="name" placeholder="Enter point">
        <div id="modalButtons">
            <button class="cancel">Cancel</button>
            <button class="confirm">Add point</button>
        </div>
    </div>
    `;
	let confirmButton = document.querySelector(".confirm");
	confirmButton.addEventListener("click", (e) => {
		e.preventDefault();
		let nameInputField = document.querySelector("#nameFromModal");
		let enteredName = nameInputField.value;
		if (enteredName !== "") {
			addPoint(enteredName, todolistIndex);
			removeModal(e);
		}
	});
	let cancelButton = document.querySelector(".cancel");
	cancelButton.addEventListener("click", removeModal);
}
function addPoint(enteredName, todolistIndex) {
	let pointIndex = todolistsArray[todolistIndex].points.length;
	todolistsArray[todolistIndex].points.push(new Point(enteredName, false, pointIndex));
	displayPoint(todolistIndex, pointIndex);
	updateLocalStorage();
}
function displayPoint(todolistIndex, pointIndex) {
	const pointsField = document.querySelector(".tasks");
	let point = document.createElement("p");
	point.textContent = todolistsArray[todolistIndex].points[pointIndex].textContent;
	pointsField.appendChild(point);
	enableTextEditing(point);
	//TODO: adds event listener for crossOutPoint() to the :before box next to the point
	//TODO: runs crossOut() method for points that have isCrossedOut: true
}

function enableTextEditing(element) {
	element.contentEditable = true;
	element.focus();
}

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

const removeAllButton = document.querySelector("#removeAllButton");
removeAllButton.addEventListener("click", () => {
	let modalBox = displayModal();
	modalBox.innerHTML = `
    <div>
        <h3 id="areYouSure">Are you sure?</h3>
        <div id="modalButtons">
            <button class="cancel">Cancel</button>
            <button class="confirm">Delete all</button>
        </div>
    </div>
    `;
	let confirmButton = document.querySelector(".confirm");
	confirmButton.addEventListener("click", () => {
		localStorage.removeItem("todolistsArray");
		location.reload(true);
	});
	let cancelButton = document.querySelector(".cancel");
	cancelButton.addEventListener("click", removeModal);
});

//Site loads:
if (localStorage.getItem("todolistsArray") !== null) {
	todolistsArray = JSON.parse(localStorage.getItem("todolistsArray"));
	for (let i = 0; i < todolistsArray.length; i++) {
		addNameSidebar(todolistsArray[i].name);
	}
}
/* local storage test */
console.log(todolistsArray);

/* --- TODO --- */

//zamiast addPointButton, miejsce na wpisanie nowego pointa tak jak Wojtek chcial, i potem przyciskiem dodanie

//Trash button when you hover on the sidebar

//p::before:hover - cursor na pointer i zeby pojawial sie svg okay tick

//make the sidebar sligtly shorter and add an orange thang that at it's side next to te todolist that is open

//add <hr>s to sidebar and todolist points

//make buttons and top panel look nice
//find some cool font

//if todolist has any points and all are crossed it shows a checkmark next to the title and the names in the sidebar

//settings cog that opens a settings sidebar (with an animation) on the right with the top-most z-index and grays out the rest
//spin animation when clicked
