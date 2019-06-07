function renderTodos() {
    let template = document.getElementById("todos-template").innerHTML;
    let templateFunction = Handlebars.compile(template);
    let html = templateFunction({ name: 'Gordon Ramsay' });
}

function renderTodo() {
    let template = document.getElementById("todo-template").innerHTML;
    let templateFunction = Handlebars.compile(template);
    let html = templateFunction({ name: 'Gordon Ramsay' });
}