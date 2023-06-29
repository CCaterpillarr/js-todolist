let todolistsArray = [];
function Todolist(name, points, index) {
	this.name = name;
	this.points = points;
	this.index = index;
}
function Point(textContent, isChecked, index) {
	this.textContent = textContent;
	this.isChecked = isChecked;
	this.index = index;
}

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
	addNameSidebar(enteredName, todolistsArray.length - 1); //needs to be -1 because after adding that todolist the array length is +1
}

function addNameSidebar(todolistName, todolistIndex) {
	const sidebar = document.querySelector("#sidebar");
	sidebar.removeChild(addTodolistButton);
	const sideNameContainer = document.createElement("div");
	sideNameContainer.classList.toggle("sideNameContainer");
	const sideName = document.createElement("p");
	sideName.textContent = todolistName;
	sideName.setAttribute("id", `todolistIndex${todolistIndex}`);
	sidebar.appendChild(sideNameContainer);
	sideNameContainer.append(sideName);
	sidebar.appendChild(addTodolistButton);
	sideNameContainer.addEventListener("click", () => {
		displayTodolist(todolistIndex);
	});
	sideNameContainer.addEventListener("mouseover", () => {
		/* 		const trash = document.createElement("div");
		trash.classList.toggle("trash");
		sideNameContainer.appendChild(trash);
		trash.addEventListener("click", () => {
			deleteTodolist(todolistIndex);
		}); */
	});
	sideNameContainer.addEventListener("mouseout", () => {
		/* 		const trash = document.querySelector(".trash");
		trash.remove(); */
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
        <input type="text" id="pointInputField"></input>
		<button id="saveChangesButton">Save changes</button>
    `;
	if (elementExists("todolist") === true) {
		let todolistForRemoval = document.querySelector("#todolist");
		todolistForRemoval.remove();
	}
	body.appendChild(todolistDisplay);
	const pointInputField = document.querySelector("#pointInputField");
	pointInputField.focus();
	let todolistTitle = document.querySelector(".title");
	todolistTitle.contentEditable = true;
	addExistingPoints(index);
	const saveChangesButton = document.querySelector("#saveChangesButton");
	saveChangesButton.addEventListener("click", () => {
		saveChanges(index);
	});
	todolist.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			const pointInputField = document.querySelector("#pointInputField");
			let enteredName = pointInputField.value;
			if (enteredName !== "") {
				addPoint(enteredName, index);
				pointInputField.value = "";
			}
		}
	});
}

function elementExists(elementId) {
	var element = document.getElementById(elementId);
	return element !== null;
}
function addExistingPoints(todolistIndex) {
	for (let i = 0; i < todolistsArray[todolistIndex].points.length; i++) {
		displayPoint(todolistIndex, todolistsArray[todolistIndex].points[i].index);
		if (todolistsArray[todolistIndex].points[i].isChecked === true) {
			checkPoint(todolistIndex, i);
		}
	}
}

function addPoint(enteredName, todolistIndex) {
	let pointIndex = todolistsArray[todolistIndex].points.length;
	todolistsArray[todolistIndex].points.push(new Point(enteredName, false, pointIndex));
	displayPoint(todolistIndex, pointIndex);
	updateLocalStorage();
}
function displayPoint(todolistIndex, pointIndex) {
	const pointsField = document.querySelector(".tasks");
	const pointContainer = document.createElement("div");
	pointContainer.classList.toggle("pointContainer");
	pointsField.appendChild(pointContainer);
	let checkbox = document.createElement("div");
	checkbox.classList.toggle("checkbox");
	checkbox.setAttribute("id", `checkboxIndex${pointIndex}`);
	pointContainer.appendChild(checkbox);
	let point = document.createElement("p");
	point.classList.toggle("point");
	point.setAttribute("id", `pointIndex${pointIndex}`);
	point.textContent = todolistsArray[todolistIndex].points[pointIndex].textContent;
	pointContainer.appendChild(point);
	checkbox.addEventListener("click", () => {
		todolistsArray[todolistIndex].points[pointIndex].isChecked = true;
		checkPoint(todolistIndex, pointIndex);
		updateLocalStorage();
	});
	point.contentEditable = true;
}
function checkPoint(todolistIndex, pointIndex) {
	if (todolistsArray[todolistIndex].points[pointIndex].isChecked === true) {
		point = document.querySelector(`#pointIndex${pointIndex}`);
		checkbox = document.querySelector(`#checkboxIndex${pointIndex}`);
		point.classList.toggle("checkedPoint");
		point.contentEditable = false;
		checkbox.remove();
		let crossLine = document.createElement("div");
		crossLine.classList.toggle("crossLine");
		point.appendChild(crossLine);
	}
}
//prevents adding multiple lines in point input field
document.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		event.preventDefault();
	}
});

function saveChanges(todolistIndex) {
	const name = document.querySelector(".title").textContent;
	todolistsArray[todolistIndex].name = name;
	const points = Array.from(document.querySelectorAll(".point"));
	const numberOfPoints = todolistsArray[todolistIndex].points.length;
	for (let i = 0; i < numberOfPoints; i++) {
		todolistsArray[todolistIndex].points[i].textContent = points[i].textContent;
	}
	let nameOnSidebar = document.querySelector(`#todolistIndex${todolistIndex}`);
	nameOnSidebar.textContent = name;
	updateLocalStorage();
	showTick();
}

function showTick() {
	const todolist = document.querySelector("#todolist");
	const saveChangesButton = document.querySelector("#saveChangesButton");
	const tick = document.createElement("div");
	tick.classList.toggle("tick");
	todolist.insertBefore(tick, saveChangesButton);
	setTimeout(function () {
		tick.style.opacity = "0";
	}, 100);
}

/* function deleteTodolist(todolistIndex) {
		todolistsArray.splice(todolistIndex, 1);
	const sideName = document.querySelector(`.todolistIndex${todolistIndex}`);
	sideName.remove();
	if (elementExists("todolist") === true) {
		const title = document.querySelector(".title");
		if (sideName === title) {
			const todolistDisplay = document.querySelector("#todolist");
			todolistDisplay.remove();
		}
	}
} */

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
		addNameSidebar(todolistsArray[i].name, todolistsArray[i].index);
	}
}

/* console.log(todolistsArray); */
