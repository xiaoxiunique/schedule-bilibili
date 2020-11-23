const Bilibili = require('./api/bilibili');

const tasks = require('./task');

(async function () {
  // run task
  let taskLists = Object.keys(tasks);
  taskLists = taskLists.filter((f) => !['Base', 'Index'].some((s) => f === s));

  const taskList = taskLists
    .reduce((acc, taskName) => {
      const taskNameClass = require('./task/' + taskName);
      const newObj = new taskNameClass();
      return acc.concat(newObj);
    }, [])
    .sort((x, y) => x.order() - y.order());

  for (const task of taskList) {
    console.info('\n');
    console.info(`----- 执行 ${task.getTaskName()} -----`);
    await task.run();
  }
})();
