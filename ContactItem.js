var ContactItem = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
  },
 

  onClick() {
 
    //API call to delete.
    $.ajax( { url: "https://api.mlab.com/api/1/databases/"+myDB+"/collections/"+myCollection+"/"+this.props.id+"?apiKey="+apiKey,
      type: "DELETE",
      async: true,
      timeout: 300000,
      success: function (data) { },
      error: function (xhr, status, err) { } } )

      .done(function(data) {
        // TODO: add a DOM element to indicate that the record was removed.
        $( this ).addClass( "done" )
        if ( console && console.log ) {
           console.log( "Record was deleted: " + data);
           
        }
      })
    

  },


  render: function() {
    return (
      React.createElement('div', {className: 'ContactItem'},

        React.createElement('button', {onClick: this.onClick, className: 'button', id: this.props.id}, "Delete"),
        React.createElement('div', {className: 'ContactItem-name'}, this.props.name),
        React.createElement('div', {className: 'ContactItem-email'}, this.props.email),
        React.createElement('div', {className: 'ContactItem-description'}, this.props.description)
      )
    )
  },
});
