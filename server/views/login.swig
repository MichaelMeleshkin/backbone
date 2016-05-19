{% extends 'main.swig' %}
{% block body %}
    <form id="loginForm" class="pin-7" action="/login" method="POST" name="loginForm">
        <div>
            <label for="username">User Name</label>
            <input id="username" name="username" type="text" />
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" name="password" type="password" />
        </div>

        <input class="login" type="submit" value=""/>
        <div class="error"></div>
    </form>
    <script type="text/javascript">
        $(document.forms['loginForm']).on('submit', function() {
            var form = $(this);

            $('.error', form).html('');

            $.ajax({
                url: "/login",
                data: form.serialize(),
                method: "POST",
                statusCode: {
                    200: function() {
                        window.location.href = "/";
                    },
                    403: function(jqXHR) {
                        $('.error').html(jqXHR);
                    }
                }
            });
            return false;
        });
    </script>
{% endblock %}
