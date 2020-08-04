var worker;
var workerMessageId = 0; // Number.MIN_SAFE_INTEGER would be better,
                         // but I don't think it will ever reach Number.MAX_SAFE_INTEGER
var workerPromises = {};
var config = {
    workerURL: "measure_blur_worker.js"
};

function measureBlurAsync(imageData) {
    if (!worker) {
        worker = new Worker(config.workerURL);
        worker.onmessage = function(e) {
            workerPromises[e.data.id](e.data.score);
            delete workerPromises[e.data.id];
        };
    }

    return new Promise(function(resolve) {
        var id = ++workerMessageId;
        worker.postMessage({
            id: id,
            imageData: imageData
        });
        workerPromises[id] = resolve;
    });
}

measureBlurAsync.setup = function(configExt) {
    Object.assign(config, configExt);
};

measureBlurAsync.remove = function(configExt) {
    if (worker) {
        worker.terminate();
        worker = null;
        workerPromises = {};
    }
};

module.exports = measureBlurAsync;