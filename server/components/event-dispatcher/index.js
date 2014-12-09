/**
 * Event dispatcher for delegating an event/action pair to a topic resp for beh
 *
 * Note: The event name convention is currently {topicName}.{actionName}.
 *
 * @author Sean Teare <steare@redventures.com>
 * @since 9/23/14.
 */
var debug = require('debug')('eventdispatcher');
var topics = {
  defaultTopic: function (data, cb) {
    return cb(undefined, data);
  }
};
var DefaultTopic = topics.defaultTopic;

function noop () {}
function handleError (message, callback) {
  callback = callback || noop;
  var err = new Error(message);
  debug(err.message);
  return callback(err);
}

function extractEventNameComponent (eventStr, index) {
  var objPathArray = eventStr.trim().split('.');
  return objPathArray[index];
}

function extractTopicName (eventStr) {
  return extractEventNameComponent(eventStr, 0);
}

function extractActionName (eventStr) {
  return extractEventNameComponent(eventStr, 1);
}

function sourceIsAllowed (eventTopic, source, event, callback) {
  var topicName = extractTopicName(event);
  var actionName = extractActionName(event);
  debug('Ensuring source is allowed for topic: ' + source + ' - ' + topicName);
  if (!eventTopic.isTopicAllowedForSource(source)) {
    return handleError(
      'Source "' + source + '" is unauthorized to execute topic "' + topicName + '"',
      callback,
      {
        source: source,
        topic: topicName,
        action: actionName
      }
    );
  }

  debug(
    'Ensuring source is allowed for action: ' + source
      + ' - ' + topicName + ' - ' + actionName
  );
  if (!eventTopic.isActionAllowedForSource(actionName, source)) {
    return handleError(
      'Source "' + source + '" is unauthorized to execute action "'
        + actionName + '" on topic "' + topicName + '"',
      callback,
      {
        source: source,
        topic: topicName,
        action: actionName
      }
    );
  }

  return true;
}

function dispatch (source, event, data, callback) {
  callback = callback || noop;
  if (!event || !event instanceof String || event.indexOf('.') === -1) {
    return handleError('Malformed event received', callback);
  }

  var topicName = extractTopicName(event);
  var actionName = extractActionName(event);
  var msg;
  var eventTopic;
  var usingDefaultTopic = false;

  if (!topics[topicName]) {
    eventTopic = new DefaultTopic();
    msg = 'No topic with name "' + topicName + '" found, using default topic';
    usingDefaultTopic = true;
  } else {
    eventTopic = new topics[topicName]();
    if (!eventTopic.hasActionHandler(actionName)) {
      eventTopic = new DefaultTopic();
      msg = 'No action handler with name "' + actionName
        + '" found in "' + topicName + '" topic, using default topic';
      usingDefaultTopic = true;
    }
  }
  if (usingDefaultTopic) {
    // Execute the default topic (without auth)
    return eventTopic.execute(event, data, callback);
  }

  // C. Locklear -- ensure we can actually execute this
  if (sourceIsAllowed(eventTopic, source, event, callback)) {
    // Passed all the auth checks, execute the event
    return eventTopic.execute(actionName, data, callback);
  }
}

module.exports = {
  dispatch: dispatch,
  extractTopicName: extractTopicName,
  extractActionName: extractActionName
};
