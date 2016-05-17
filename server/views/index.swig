{% extends 'main.swig' %}
{% block body %}
    <a href="/logout">Logout</a>
    <div class="tasks-category-wrap">
        <label for="tasks-category">Category:</label>
        <select name="" id="tasks-category">
            <option value="0" selected>All tasks</option>
            <option value="1">Tasks for today</option>
            <option value="2">Planned</option>
            <option value="3">Completed</option>
            <option value="4">Skipped</option>
        </select>
    </div>
    <div id="content" class="content-wrapper"></div>
    <div id="notification" class="notification-wrapper"></div>
{% endblock %}
