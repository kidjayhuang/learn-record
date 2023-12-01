const myWorker = new Worker("/worker.ts");

myWorker.postMessage("Hello, worker!");

myWorker.onmessage = (event) => {
  console.log(`Message received from worker: ${event.data}`);
};
