/*
 * Constants
 */

var CONTACT_TEMPLATE = {
    name: "",
    email: "",
    description: "",
    errors: null
}

// In a production application we would hide the apiKey serverside
var apiKey = "B9URpSshbpOVhGlfXCZ4cReTixCh53W7"
var myDB = "piam_test"
var myCollection = "contacts"
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

// Load the initial state of the app by populating it with all contacts.
$.ajax({
        url: "https://api.mlab.com/api/1/databases/" + myDB + "/collections/" + myCollection + "?apiKey=" + apiKey
    })
    .done(function(data) {

        // Load all the contacts in the database. Note, Mongo document IDs are native ObjectId instances and are returned as
        // the field _id. We need to extract the $oid property to use as the identifier for each contact so that we can
        // refer to it for deleting.
        // For more info, see: https://docs.mongodb.com/v3.2/reference/method/ObjectId/
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
    setState({
        newContact: contact
    });
}

function submitNewContact() {
    var contact = Object.assign({}, state.newContact, {
        key: state.contacts.length + 1,
        errors: {}
    });

    if (!contact.name) {
        contact.errors.name = ["Please enter your new contact's name"]
    }
    if (!/.+@.+\..+/.test(contact.email)) {
        contact.errors.email = ["Please enter your new contact's email"]
    }

    setState(
        Object.keys(contact.errors).length === 0 ?
        {
            newContact: Object.assign({}, CONTACT_TEMPLATE),
            contacts: state.contacts.slice(0).concat(contact),
        } :
        {
            newContact: contact
        }
    )
}
