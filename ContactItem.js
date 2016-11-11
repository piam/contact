var ContactItem = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
        visible: React.PropTypes.boolean
    },

    onClick() {
        // Call the API and specify the collection and apiKey. Note the HTTP verb
        // must be "DELETE".
        $.ajax({
            url: "https://api.mlab.com/api/1/databases/" + myDB + "/collections/" + myCollection + "/" + this.props.id + "?apiKey=" + apiKey,
            type: "DELETE"
        })
        .done(function(data) {
          // TODO: Update the UI to remove the successfully deleted Contact
        })
    },

    render: function() {
        return (
            React.createElement('div', {
                    className: 'ContactItem ' +  this.props.visible
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
        )
    },
});
