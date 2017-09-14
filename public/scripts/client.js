console.log('js');

function onReady() {
  console.log('ready!');
  $('#addInventory').on('click', addInventory);
  
  // 3 params for things that are not yet on the dom
  // event, class to watch for, function to run
  $('#inventory').on('click', '.deleteMe', deleteInventory);
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
            getInventory();
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
            $('#inventory').empty();
            console.log('inventory resp ->', serverResp);
            // for each item
            for (var i = 0; i < serverResp.length; i++) {
                console.log('serverResp[i]', serverResp[i]);

                // include data-id on the item Div
                var $itemDiv = $('<div>', {text: serverResp[i].item}).data('id', serverResp[i].id);
                
                // include a button with the class deleteMe
                var $delBtn = $('<input>', {type: 'button', class: 'deleteMe', value:'Delete'});

                $itemDiv.append($delBtn);
                $('#inventory').append($itemDiv);                
            }
        }
    });
}

function deleteInventory() {
    var thisId = $(this).parent().data('id');
    console.log('in deleteInventory', thisId);

    $.ajax({
        method: 'DELETE',
        url: '/inventory/' + thisId,
        success: function(resp) {
            console.log('server response is', resp);            
        }
    });
}

$(document).ready(onReady);