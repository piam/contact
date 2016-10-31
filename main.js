/*
 * Constants
 */


var CONTACT_TEMPLATE = {name: "", email: "", description: "", errors: null}

var apiKey = "B9URpSshbpOVhGlfXCZ4cReTixCh53W7"


/*
 * Model
 */


// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);
  
  ReactDOM.render(
    React.createElement(ContactsView, Object.assign({}, state, {
      onNewContactChange: updateNewContact,
      onNewContactSubmit: submitNewContact,
    })),
    document.getElementById('react-app')
  );
}



let ccc = $.ajax( { url: "https://api.mlab.com/api/1/databases/piam_test/collections/contacts?apiKey="+apiKey} )
    .done(function(data) {

// Set initial data
setState({
  contacts: data.map(function(o) {
     return {
       id: o._id.$oid,
       name: o.name,
       email: o.email,
       description: o.description
     };
  }),
  newContact: Object.assign({}, CONTACT_TEMPLATE),
});

     })

  





/*
 * Actions
 */


function updateNewContact(contact) {
  setState({ newContact: contact });
}


function submitNewContact() {
  var contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});
  
  if (!contact.name) {
    contact.errors.name = ["Please enter your new contact's name"]
  }
  if (!/.+@.+\..+/.test(contact.email)) {
    contact.errors.email = ["Please enter your new contact's email"]
  }

  setState(
    Object.keys(contact.errors).length === 0
    ? {
        newContact: Object.assign({}, CONTACT_TEMPLATE),
        contacts: state.contacts.slice(0).concat(contact),
      }
    : { newContact: contact }
  )
}
