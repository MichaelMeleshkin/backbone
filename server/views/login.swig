{% extends 'main.swig' %}
{% block body %}
    <form action="/login" method="POST" name="loginForm">
        <label for="username">User Name</label>
        <input id="username" name="username" type="text" />

        <label for="password">Password</label>
        <input id="password" name="password" type="password" />

        <input type="submit" value="Login"/>
    </form>
    <div class="error"></div>
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
