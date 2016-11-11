/*
 * Constants
 */

var CONTACT_TEMPLATE = {
    name: "",
    email: "",
    description: "",
    errors: null
};

// In a production application we would hide the apiKey serverside
var apiKey = "B9URpSshbpOVhGlfXCZ4cReTixCh53W7";
var myDB = "piam_test";
var myCollection = "contacts";


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
    url: "https://api.mlab.com/api/1/databases/" + myDB + "/collections/" + myCollection + "?apiKey=" + apiKey,

    success: function(data) {
        // Load all the contacts in the database. Note, Mongo document IDs are native ObjectId instances and are returned as
        // the field _id. We need to extract the $oid property to use as the identifier for each contact so that we can
        // refer to it for deleting.
        // For more info, see: https://docs.mongodb.com/v3.2/reference/method/ObjectId/
        setState({
            contacts: data.map(function(o) {
                return {
                    id: o.email,
                    name: o.name,
                    email: o.email,
                    description: o.description
                };
            }),
            newContact: Object.assign({}, CONTACT_TEMPLATE),
        });
    },
    error: function(xhr, status, err) {
        // TODO: surface the error to the user.

    }
});
/*
 * Actions
 */

function updateNewContact(contact) {
    setState({
        newContact: contact
    });
}

// THis is the callback that gets invoked when the uesr submits the form. Notice
// that this is configured when the ContactView is instantiated.
//
function submitNewContact() {

    var contact = Object.assign({}, state.newContact, {
        key: state.contacts.length + 1,
        id: state.newContact.email,
        errors: {}
    })

    if (!contact.name) {
        contact.errors.name = ["Please enter your new contact's name"];
    }
    if (!/.+@.+\..+/.test(contact.email)) {
        contact.errors.email = ["Please enter your new contact's email"];
    }

    if (!jQuery.isEmptyObject(contact.errors)) {
        // There was a validation error on the form, so we cannot proceed with
        // inserting it to the database (or rendering it).
        return;
    }

    // Insert the contact document via the API. Note that we override the _id
    // field with the email address. This is necessary as the Data API does not
    // return the _id for documents inserted into the database and we need to
    // provide the _id field to the other elements in the App.
    let contactDocument = {
        name: contact.name,
        email: contact.email,
        description: contact.description,
        _id: contact.email
    };
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/" + myDB + "/collections/" + myCollection + "?apiKey=" + apiKey,
        data: JSON.stringify([contactDocument]),
        type: "POST",
        contentType: "application/json",

        success: function(data) {
            // TODO: Add a visual indicator that the Contact was added such as
            // a fade effect.
        },
        error: function(xhr, status, err) {
            // TODO: surface the error to the user.
        }
    });

    setState(
        Object.keys(contact.errors).length === 0 ? {
            newContact: Object.assign({}, CONTACT_TEMPLATE),
            // TOOO: if the contact already exists, we can simply update it with
            // the new contact information.
            contacts: state.contacts.slice(0).concat(contact),
        } : {
            newContact: contact
        }
    );
}
