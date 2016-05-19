{% extends 'main.swig' %}
{% block body %}
    <div class="top-panel clearfix">
        <div id="control"></div>
        <div id="listType"></div>
        <a class="m20 logout right" href="/logout"></a>
    </div>

    <div id="content" class="content-wrapper"></div>
    <div id="notification" class="notification-wrapper"></div>
{% endblock %}
