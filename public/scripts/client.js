console.log('js');

function onReady() {
  console.log('ready!');
  
  getInventory();
};

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