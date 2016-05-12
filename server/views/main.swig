<!DOCTYPE html>
<html>
    <head>
        <title>{% block title %}Title{% endblock %}</title>
        {% block head %}
            <link rel="stylesheet" href="min/css/main.css">
            <script type="text/javascript" src="min/js/main.js"></script>
        {% endblock %}
        {% block templates %}
            <script id="todoListItemTemplate" type="text/template">
                <a href="#show/<%= id %>"><%= title ? title : 'Empty title' %></a>
                <a href="#edit/<%= id %>">Edit</a>
            </script>
            <script id="todoFullTemplate" type="text/template">
                <div>Title: <%= title %></div>
                <div>Date: <%= date %></div>
                <div>Description:</div>
                <pre class="info"><%= description %></pre>
                <button class="delete">Delete</button>
                <button class="complete">Complete</button>
            </script>
            <script id="todoEditTemplate" type="text/template">
                Edit task
                <div>
                    <label>Title: <input class="title" type="text" value="<%= title %>"/></label>
                </div>
                <div>
                    <label>Date: <input class="date" type="text" value="<%= date %>"/></label>
                </div>
                <div>
                    <label><div>Description: </div><textarea class="description" cols="30" rows="2"><%= description %></textarea></label>
                </div>
                <div>
                    <button class="edit">Edit</button>
                </div>
            </script>
            <script id="todoCreateTemplate" type="text/template">
                Task creation
                <div>
                    <label>Title: <input class="title" type="text"/></label>
                </div>
                <div>
                    <label>Date: <input class="date" type="text"/></label>
                </div>
                <div>
                    <label><div>Description: </div><textarea class="description" cols="30" rows="2"></textarea></label>
                </div>
                <div>
                    <button class="create">Create</button>
                </div>
            </script>
            <script id="todoBackToMainLinkTemplate" type="text/template">
                <a class="m10 iblock hidden" href="#show/">Back to all</a>
            </script>
            <script id="todoCreateLinkTemplate" type="text/template">
                <a class="m10 iblock hidden" href="#create/">Create new task</a>
            </script>
        {% endblock %}
    </head>
    <body>
    <header>
        {% block header %}{% endblock %}
    </header>
    <section>
        {% block body %}{% endblock %}
    </section>
    <footer>
        {% block footer %}{% endblock %}
    </footer>
    </body>
</html>