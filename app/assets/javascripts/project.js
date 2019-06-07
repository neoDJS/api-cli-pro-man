
function renderProjects() {
    let template = document.getElementById("projects-template").innerHTML;
    let templateFunction = Handlebars.compile(template);
    let html = templateFunction({ name: 'Gordon Ramsay' });
}

function renderProject() {
    let template = document.getElementById("project-template").innerHTML;
    let templateFunction = Handlebars.compile(template);
    let html = templateFunction({ name: 'Gordon Ramsay' });
}


export default class Projects {
    constructor() {
        fetch('http://localhost:3000/projects.json')
            .then(resp => resp.json())
            .then(json => (this.json = json['data']))
            .then(data => _init(data)); //'http://localhost:3000/api/v1/Projects'
    }

    _init(data) {
        Object.entries(data).forEach(entry => {
            eval(`this.${entry[0]} = ${entry[1]}`);
        });
    }

    render() {
        let template = document.getElementById("projects-template").innerHTML;
        let templateFunction = Handlebars.compile(template);
        let html = templateFunction(this.json);
    }
}


export class Project {
    constructor(json) {
        this.json = json;
        _init(this.json);
    }

    _init(data) {
        Object.entries(data).forEach(entry => {
            eval(`this.${entry[0]} = ${entry[1]}`)
        });
    }

    render() {
        let template = document.getElementById("project-template").innerHTML;
        let templateFunction = Handlebars.compile(template);
        let html = templateFunction(this.json);
        document.getElementById("main").innerHTML = html
    }
}