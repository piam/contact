var ContactForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  },


  onNameInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}))
  },

  onEmailInput: function(e) {

    this.props.onChange(Object.assign({}, this.props.value, {email: e.target.value}))
  },

  onDescriptionInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}))
  },

  onSubmit: function(e) {
    e.preventDefault()
    this.props.onSubmit()

    let name = this.refs.name
    let email = this.refs.email
    let description = this.refs.description


     



    let contact = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      description: this.refs.description.value
    }

    // send the command to the server to create it.
    $.ajax( { url: "https://api.mlab.com/api/1/databases/piam_test/collections/contacts?apiKey="+apiKey,
      data: JSON.stringify( [ contact ] ),
      type: "POST",
      contentType: "application/json" } )

      .done(function(data) {
        // TODO: add a DOM element to indicate that the record was added.
        $( this ).addClass( "done" )
        if ( console && console.log ) {
           console.log( "Record was saved: " + data);
        }
      })
  },

  render: function() {
    var errors = this.props.value.errors || {}

    return (
      React.createElement('form', {onSubmit: this.onSubmit, className: 'ContactForm', noValidate: true},
        React.createElement('input', {
          type: 'text',
          className: errors.name && 'ContactForm-error',
          placeholder: 'Name (required)',
          onInput: this.onNameInput,
          value: this.props.value.name,
          ref: 'name',
        }),
        React.createElement('input', {
          type: 'email',
          className: errors.email && 'ContactForm-error',
          placeholder: 'Email (required)',
          onInput: this.onEmailInput,
          value: this.props.value.email,
          ref: 'email',
          noValidate: true,
        }),
        React.createElement('textarea', {
          placeholder: 'Description',
          onInput: this.onDescriptionInput,
          value: this.props.value.description,
          ref: 'description'
        }),
        React.createElement('button', {type: 'submit'}, "Add Contact")
      )
    )
  },
});
