"use strict";

const Stomp = require("stomp-client");
const options = require("yargs").argv;
const util = require("util");

// Advisory message types to consume
const ADVISORY_TOPICS = ["/topic/ActiveMQ.Advisory.Consumer.Queue.TEST",
                        "/topic/ActiveMQ.Advisory.Producer.Queue.TEST"];

// setup connections and callbacks.
setup(callback);

function callback(body, headers)
{
  console.log(util.format("[adv_msg] body {%s}, headers{%s}", body, headers));
}

/**
* callback must be of the form function(body,headers)
*/
function setup(callback)
{
  let connections = [];
  for(let index = 1; index < 10; index++)
  {
    // get the activemq port
    let port = util.format("p%s", index);
    if(options[port])
    {
      // create a connection to the broker
      let connection = setupConnection("localhost", options[port], "system", "manager");

      // subscribe to advisory topics
      connection.connect(function()
      {
        ADVISORY_TOPICS.forEach( function (queueName)
        {
          listenForMessages(connection, queueName, callback);
        } );
      });

      connections.push(connection);
    }
  }
  return connections;
}


function setupConnection(host, port, user, password)
{
  console.log(util.format("Creating connection: %s, %s, %s", host, port, user));
  return new Stomp(host, port, user, password);
}

/**
* callback must be of the form function(body,headers)
*/
function listenForMessages(connection, queueName, callback)
{
  console.log(util.format("Listening for messages for: %s", queueName));
  connection.subscribe(queueName, callback);
}
