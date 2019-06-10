
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

// class Todo {
//     constructor(val) {
//         fetch(`http://localhost:3000/${val}.json`)
//             .then(resp => resp.json())
//             .then(json => (this.json = json['data']))
//             .then(data => this.init(data));
//     }

//     init(data) {
//         this.id = data.id;
//         Object.entries(data.attributes).forEach(entry => {
//             // console.log(entry);
//             eval(`this.${entry[0]} = entry[1]`);
//         });
//     }

//     render() {
//         let template = document.getElementById("todo-template").innerHTML;
//         let templateFunction = Handlebars.compile(template);
//         let html = templateFunction(this);
//         document.getElementById("main").innerHTML = html
//     }
// }