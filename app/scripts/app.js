document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on('app.activated', onAppActivate);
    }
  }
};

function onAppActivate() {
  client.data.get('requester').then(function (result){
    if(result){
      getClientData(result.requester.email);
  }
  })
}

function getClientData(email){
  var name = document.getElementById('nameid');
  var emailAddress = document.getElementById('emailid');
  var phone = document.getElementById('phoneid');
  var emailToQuery = email;
  var headers = {
    Authorization: "Bearer <%= iparam.apikey %> ",
    "Content-Type": "application/json",
  };
  var options = { headers: headers};

  var url = "<%= iparam.apiurl %>?maxRecords=1&filterByFormula=%7BEmail%20Address%7D%20%3D%20%27"+ emailToQuery + "%27";
  client.request.get(url, options).then(function(result){
    if(result.response.length){
      var rec = JSON.parse(result.response);  
      if(rec.records.length == 0){
        document.getElementById('loading').style.display = "none";
        document.getElementById('nodata').style.display = "block";
        return;
      } 
      if(rec.records[0].fields["Email Address"] != null){
        name.innerHTML = rec.records[0].fields["Name"];
        emailAddress.innerHTML = rec.records[0].fields["Email Address"];
        phone.innerHTML = rec.records[0].fields["Contact Number"];
        document.getElementById('loading').style.display = "none";
        document.getElementById('details').style.display = "block";
    }
  }
  },
  function(error){
    document.getElementById('loading').style.display = "none";
    document.getElementById('nourl').style.display = "block";
    console.error(error);
    
  }
  )
};




