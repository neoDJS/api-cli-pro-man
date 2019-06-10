
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


export class Projects {
    constructor() {
        fetch('http://localhost:3000/projects.json')
            .then(resp => resp.json())
            .then(json => (this.json = json['data']))
            .then(data => this.init(data)); //'http://localhost:3000/api/v1/Projects'
    }

    init(data) {
        this.list = [];
        // console.log(data);
        data.forEach(el => {
            //     console.log(Object.entries(el.attributes));
            //     Object.entries(el.attributes).forEach(entry => {
            //         eval(`this.${entry[0]} = ${entry[1]|""}`);
            //     });
            this.list.push(new Project(el));
        });
        // console.log(this);
    }

    render() {
        let template = document.getElementById("projects-template").innerHTML;
        let templateFunction = Handlebars.compile(template);
        let html = templateFunction({ projects: this.list });
        document.getElementById("main").innerHTML = html
    }
}


export class Project {
    constructor(data) {
        if (typeof data == "string") {
            fetch(`http://localhost:3000/${data}.json`)
                .then(resp => resp.json())
                .then(json => (this.json = json['data']))
                .then(data => this.init(data));
        } else {
            this.json = data;
            this.init(this.json);
        }
    }

    init(data) {
        this.id = data.id;
        Object.entries(data.attributes).forEach(entry => {
            // console.log(entry);
            eval(`this.${entry[0]} = entry[1]`);
        });

        Object.entries(data.relationships).forEach(entry => {
            // console.log(entry[1].data);
            eval(`this.${entry[0]} = entry[1].data.map(val => related(val))`); //entry[1].data.map(val => related(val))
        });
    }

    related(entry) {
        switch (entry.type) {
            case "todos":
                return new Todo(`projects/${this.id}/todos/${entry.id}`);
            case "workers":
                return new Worker(entry.id);
        }

    }

    render() {
        let template = document.getElementById("project-template").innerHTML;
        let templateFunction = Handlebars.compile(template);
        let html = templateFunction(this);
        document.getElementById("main").innerHTML = html
    }
}