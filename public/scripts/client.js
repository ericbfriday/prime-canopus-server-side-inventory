console.log('js');

function onReady() {
  console.log('ready!');
  $('#addInventory').on('click', addInventory);
  // on ready get all inventory
  getInventory();
};

// event listeners
function addInventory() {
    // var to hold value from form
    var itemToAdd = $('#item').val();
    console.log('addInventory', itemToAdd);   

    // var to holding data we want to send to the server
    var objectToSend = {
        item: itemToAdd
    };

    // build post request and send to server
    $.ajax({
        type: 'POST',
        url: '/inventory',
        data: objectToSend, // data hold value we want to send
        success: function(serverResp) {
            console.log(serverResp);
        }
    });
}

// ajax functions
function getInventory() {
    console.log('in getInventory');
    $.ajax({
        type: 'GET',
        url: '/inventory',
        success: function(serverResp) {
            console.log('inventory resp ->', serverResp);
            for (var i = 0; i < serverResp.length; i++) {
                $('#inventory').append('<p>'+ serverResp[i] +'</p>');
            }
        }
    });
}

$(document).ready(onReady);