var ContactItem = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        description: React.PropTypes.string
    },

    onClick() {
        // Call the API and specify the collection and apiKey. Note the HTTP verb
        // must be "DELETE".
        $.ajax({
            url: "https://api.mlab.com/api/1/databases/" + myDB + "/collections/" + myCollection + "/" + encodeURIComponent(this.props.id) + "?apiKey=" + apiKey,
            type: "DELETE",
            timeout: 300000, // 5 minutes

            success: function(data) {
                // TODO: remove the contact. We'll do this in a follow-up post.
            },

            error: function(xhr, status, err) {
                // TODO: surface the error to the user.
            }
        });
    },

    render: function() {
        return (
            React.createElement('div', {
                    className: 'ContactItem'
                },
                // Add a button with an onClick callback so we can call the
                // mLab API to remove the appropriate document.
                React.createElement('button', {
                    onClick: this.onClick,
                    className: 'button',
                    id: this.props.id
                }, "Delete"),
                React.createElement('div', {
                    className: 'ContactItem-name'
                }, this.props.name),
                React.createElement('div', {
                    className: 'ContactItem-email'
                }, this.props.email),
                React.createElement('div', {
                    className: 'ContactItem-description'
                }, this.props.description)
            )
        );
    },
});
