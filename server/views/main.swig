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
                <a class="edit" href="#edit/<%= id %>"></a>
                <% if (!sharedTask) { %>
                <a class="share" href="#share/<%= id %>"></a>
                <% } %>
            </script>
            <script id="todoShareAddingTemplate" type="text/template">
                Task name: <a href="#show/<%= id %>"><%= title ? title : 'Empty title' %></a>
                <div><label>Enter user name: <input class="username" type="text"></label></div>
                <div role="button" class="share"></div>
                <ul id="shareList"></ul>
            </script>
            <script id="sharedTitle" type="text/template">
                <div class="shareListTitle">Shared for:</div>
            </script>
            <script id="todoSharedListTemplate" type="text/template">
                <div><%= name %></div>
                <div role="button" class="remove"></div>
            </script>
            <script id="todoSharedNotificationTemplate" type="text/template">
                You have next notifications:
                <ul id="notificationList"></ul>
                <div role="button" class="confirm"></div>
            </script>
            <script id="todoSharedNotificationItemTemplate" type="text/template">
                <%= isNew ? 'You have received new task:' : 'Task was removed:' %>
                <%= taskName ? taskName : 'Empty title' %>
            </script>
            <script id="todoFullTemplate" type="text/template">
                <div>Title: <%= title %></div>
                <div>Date: <%= date %></div>
                <div>Description:</div>
                <pre class="info"><%= description %></pre>
                <% if (!sharedTask) { %>
                <div role="button" class="delete"></div>
                <% } %>
                <div role="button" class="complete"></div>
            </script>
            <script id="todoEditTemplate" type="text/template">
                <div>
                    <label>Title: <input class="title" type="text" value="<%= title %>"/></label>
                </div>
                <div>
                    <label>Date: <input class="date" type="text" value="<%= date %>"/></label>
                </div>
                <div>
                    <label>Description: <br /><textarea class="description" cols="22" rows="3"><%= description %></textarea></label>
                </div>
                <div>
                    <div role="button" class="edit"></div>
                </div>
            </script>
            <script id="todoCreateTemplate" type="text/template">
                <div>
                    <label>Title: <input class="title" type="text"/></label>
                </div>
                <div>
                    <label>Date: <input class="date" type="text"/></label>
                </div>
                <div>
                    <label>Description: <br /><textarea class="description" cols="22" rows="3"></textarea></label>
                </div>
                <div>
                    <div role="button" class="create"></div>
                </div>
            </script>
            <script id="todoBackToMainLinkTemplate" type="text/template">
                <a class="m20 iblock hidden back" href="#show"></a>
            </script>
            <script id="todoCreateLinkTemplate" type="text/template">
                <a class="m20 iblock hidden new" href="#create"></a>
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