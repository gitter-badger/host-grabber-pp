'use strict';

/**
 * Creates a new processing queue.
 * @param {function} handleProcessorFn The function to handle a processor when it is picked up in the queue.
 * @returns {object} A new queue object.
 */
function newQueue(handleProcessorFn) {

  var queue = {
    processingQueue: [],
    processingHistory: new Map(),
    append: append,
    processNextItem: processNextItem,
    remove: remove
  };


  /**
   * Appends a processor to the queue.
   * @param {object} processor A Processor.
   * @returns {undefined}
   */
  function append(processor) {
    queue.processingQueue.push(processor);
    queue.processingHistory.set(processor.id, processor);
  }


  /**
   * Removes a processor from the processing queue and history.
   * @param {string} processorId The processor ID.
   * @returns {undefined}
   */
  function remove(processorId) {
    var processor = queue.processingHistory.get(processorId);
    queue.processingHistory.delete(processorId);

    var index = queue.processingQueue.indexOf(processor);
    if (index > -1) {
      queue.processingQueue.splice(index, 1);
    }
  }


  /**
   * Picks the first item in the queue and processes it.
   * @returns {undefined}
   */
  function processNextItem() {

    // Get an item to process
    var processor = queue.processingQueue.shift();

    // Handle it, provided it exists
    if (!! processor) {
      handleProcessorFn(processor);
    }
  }

  // Return the new queue
  return queue;
}
