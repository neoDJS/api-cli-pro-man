
// import { Project } from "project";

import Projects, { Project } from './project';

$(document).ready(function() {

    Handlebars.registerHelper('list', function(context, options) {
        var attrs = Object.keys(options.hash).map(function(key) {
            return key + '="' + options.hash[key] + '"';
        }).join(" ");

        return "<ul " + attrs + ">" + context.map(function(item) {
            return "<li>" + options.fn(item) + "</li>";
        }).join("\n") + "</ul>";
    });

    $('#createTodo').on('click', function() {
        // $.post{

        // }.done(data => {})
    });

    $('a[href=/projects]').on('click', function(e) {
        e.preventDefault();
        p = new Projects();
        p.render();
    });

    $(`a[href=/projects/${/(d+)/}]`).on('click', function(e) {
        e.preventDefault();
        p = new Project();
        p.render();
    });

});