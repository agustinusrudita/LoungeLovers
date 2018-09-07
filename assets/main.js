$(function() {	
	var parent_ticket = '';
  	var client = ZAFClient.init();
  	client.invoke('resize', { width: '100%', height: '120px' });    
  
  	client.get('ticket.id').then(
  		function(data) {
  			var ticket_id = data['ticket.id'];	
  			if(!isNaN(data['ticket.id'])){
          client.invoke('routeTo', 'ticket', 'new');
        }          
  		}
  	);
	/*client.invoke('instances.create', {
  		location: 'modal',
  		url: 'https://rudita1.zendesk.com/agent/tickets/new/1'
	}).then(function(modalContext) {
  		// The modal is on screen now
  		let modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
      console.log(modalClient);
  		modalClient.invoke('resize', { width: '1024px', height: '768px' });       
  		modalClient.on('modal.close', function() {
  		// The modal has been closed
  		});
	});*/
});

function requestTicketInfo(client, id) {
  var settings = {
    url: '/api/v2/tickets/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };

  client.request(settings).then(
    function(data) {
      showTicketInfo(data)
    },
    function(response) {
      showError(response);
    }
  );
}
function showTicketInfo(data) {
  var requester_data = {
    'name': data.ticket.requester_id,
    'tags': data.ticket.tags,
    'created_at': data.ticket.subject,
    'last_login_at': data.ticket.subject
  };
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}

function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}
