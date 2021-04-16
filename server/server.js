const maxEmailLength = 30;
function createclient(payload) {
  // same fields should be created in Airtable
  const record = {
    records: [
      {
        fields: {
          "Email Address": payload["data"]["requester"]["email"],
          Name: payload["data"]["requester"]["name"],
          "Contact Number": JSON.stringify(
            payload["data"]["requester"]["mobile"]
          ),
        },
      },
    ],
  };
  const body = JSON.stringify(record);
  const options = {
    headers: {
      Authorization: "Bearer <%= iparam.apikey %> ",
      "Content-Type": "application/json",
    },
    body,
  };
  return new Promise(function (resolve, reject) {
    $request.post("<%= iparam.apiurl %>", options).then(
      function (response) {
        if (response) {
          console.info(
            "Record created in Airtable. Response status: " + response.status
          );
          resolve(response.status);
        }
      },
      function (error) {
        console.error(
          "Record could not be created in Airtable. Error: " + error.response
        );

        reject(error.response);
      }
    );
  });
}

exports = {
  events: [
    { event: "onTicketCreate", callback: "onTicketCreateHandler" },
    { event: "onAppInstall", callback: "onInstallHandler" },
  ],

  onInstallHandler: function () {
    const options = {
      headers: {
        Authorization: "Bearer <%= iparam.apikey %> ",
        "Content-Type": "application/json",
      },
    };

    $request
      .get(`<%= iparam.apiurl %>` + `?maxRecords=3&view=Grid%20view`, options)
      .then(
        function (response) {
          if (response) {
            console.info("API Parameters are correct");
            renderData();
          }
        },
        function (error) {
          console.error(
            "API Parameters are not correct for Airtable. Error: " +
              error.response,
            error
          );

          renderData({ message: "Check the API Parameters for Airtable" });
        }
      );
  },
  onTicketCreateHandler: function (payload) {
    if (payload) {
      const strEmail = payload["data"]["requester"]["email"];
      if (strEmail.length < maxEmailLength)
        $db.get(strEmail).then(
          function () {
            console.log("Record with email already created.");
          },
          function (error) {
            if (error.status == 404) {
              console.log(
                "Record has not been created in FreshService for requester"
              );

              createclient(payload)
                .then(function (msg) {
                  console.info(msg);
                  $db
                    .set(strEmail, { email: strEmail })
                    .then(function (response) {
                      if (response.Created != true) {
                        console.error("email could not be stored in db");
                      }
                    });
                })
                .catch(function (msg) {
                  console.error(msg);
                });
            }
          }
        );
    }
  },
};
