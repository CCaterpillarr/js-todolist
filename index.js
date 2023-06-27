//Array of todolists
//  Each todolist is an object with name, array of points and index
//    Each point is an object with text content, isCrossedOut, crossOut() method and index

//crossOut():
//  removes the :before box from the point
//  draws an :after line over the current point in dom
//  grays out point and line color
//  changes the isCrossedOut property of the object to true
//  updateLocalStorage

// ---

//Site loads:
//  if string with the array in local storage !== "":
//    load it and replace the array of todolists with it
//    addNameSidebar() for each todolist in the array

// ---

//Add button is clicked:
//  let box = promptBox();
//  append the ask for the name of the todolist in box
//  append cancel button in box
//    cancel eventListener - removePromptBox()
//  append add button in box
//    add button eventListener:
//      createTodolist();
//      updateLocalStorage();
//      removePromptBox();
//      displayNote();

//promptBox():
//  gray out background
//  draw a white box
//  event listener when gray background or escape is clicked: removePromptBox();
//  return variable that points to the box

//removePromptBox():
//  remove the background (and thus the prompt box)

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

//updateLocalStorage():
//  stringify array of todolists
//  add to localstorage

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
//  let box = promptBox();
//  append the ask for the name of the point in box
//  append cancel button in box
//    cancel eventListener - removePromptBox()
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
//  writes "" to the string in local storage
//  Refreshes the page

/* TODO ---------------------- */

//Trash button when you hover on the sidebar

//if todolist has any points and all are crossed it shows a checkmark next to the title and the names in the sidebar
