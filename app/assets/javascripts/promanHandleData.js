
// import { Project } from "project";

// import { Project, Projects } from './project';

$(document).ready(function() {

    var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

    Handlebars.registerHelper('list', function(context, options) {
        var attrs = Object.keys(options.hash).map(function(key) {
            return key + '="' + options.hash[key] + '"';
        }).join(" ");

        return "<ul " + attrs + ">" + context.map(function(item) {
            return "<li>" + options.fn(item) + "</li>";
        }).join("\n") + "</ul>";
    });

    $(document).on('submit', '#createTodo', function(e) {
        e.preventDefault();
        // console.log($(this).parent("form").serialize());
        var posting = $.ajax({
            type: "POST",
            url: $(this).attr("action") + ".json?&authenticity_token=" + encodeURIComponent(AUTH_TOKEN),
            data: $(this).serialize(),
            dataType: "script"
        });
        posting.done(function(data) {
            // TODO: handle response
            // $("p").toggleClass("main");
            todo = JSON.parse(data);
            if (todo.errors) {
                Object.keys(todo.errors).forEach((key) => $("#alert").text(todo.errors[key].msg));
            } else {
                $("#notice").empty();
                $("#alert").empty();
                $("#todo_task").empty();
                console.log(todo);
                $("ul#todos").append(`<li><a href='/todos/${todo.id}'>${todo.task}</a></li>`);
            }
        });
        return false;
    });

    // $(window.location).on('change', function(e) {
    //     console.log('heeeeeeeeeeeeeeeeeeoooooooooooooooo');
    //     if (window.location.href == '/projects') {
    //         e.preventDefault();
    //         p = new Projects();
    //         console.log(p);
    //         setTimeout(() => p.render(), 500);
    //     } else if (window.location.href.startsWith('/projects/')) {
    //         e.preventDefault();
    //         console.log(e.target.pathname);
    //         p = new Project(e.target.pathname);
    //         console.log(p);
    //         setTimeout(() => p.render(), 1000);
    //     }
    // });

    $(document).on('click', "a[href='/projects']", function(e) {
        e.preventDefault();
        p = new Projects();
        console.log(p);
        setTimeout(() => p.render(), 500);
        // p.render();
    });

    $(document).on('click', "a[href^='/projects/']", function(e) {
        e.preventDefault();
        console.log(e.target.pathname);
        p = new Project(e.target.pathname);
        console.log(p);
        setTimeout(() => p.render(), 1000);
    });

    // $(document).on('submit', "ul + p > form", function(e) {
    //     e.preventDefault();
    //     console.log("tetsttsts");
    //     // p.render();
    // });

});





class Projects {
    constructor() {
        fetch('http://localhost:3000/projects.json')
            .then(resp => resp.json())
            .then(json => (this.json = json))
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
        // window.location.href = `http://localhost:3000/projects`;
        document.getElementById("main").innerHTML = html
    }
}


class Project {
    constructor(data) {
        if (typeof data == "string") {
            fetch(`http://localhost:3000/${data}.json`)
                .then(resp => resp.json())
                .then(json => (this.json = json))
                .then(data => this.init(data));
        } else {
            this.json = data;
            this.init(this.json);
        }
    }

    init(data) {
        this.id = data.id;
        Object.entries(data).forEach(entry => {
            // console.log(entry);
            eval(`this.${entry[0]} = entry[1]`);
        });
    }

    render() {
        let template = document.getElementById("project-template").innerHTML;
        let templateFunction = Handlebars.compile(template);
        let html = templateFunction(this);
        // window.location.href = `http://localhost:3000/projects/${this.id}`;
        document.getElementById("main").innerHTML = html
    }
}