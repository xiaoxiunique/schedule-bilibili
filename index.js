const tasks = require('./task');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

(async function () {
  const [cookie, serverSecret] = process.argv.slice(2);
  console.log('cookie, serverSecret: ', cookie, serverSecret);

  if (!cookie) {
    console.error('----- [参数传递不正确，请检查参数] -----');
    return;
  }
  // save user data
  fs.writeFileSync(
    path.join(__dirname, './task/userStatus.json'),
    JSON.stringify({ cookie, serverSecret }),
    { encoding: 'utf-8' }
  );

  // run task
  let taskLists = Object.keys(tasks);
  taskLists = taskLists.filter((f) => !['Base', 'Index'].some((s) => f === s));

  const taskList = taskLists
    .reduce((acc, taskName) => {
      const taskNameClass = require('./task/' + _.lowerFirst(taskName));
      const newObj = new taskNameClass();
      return acc.concat(newObj);
    }, [])
    .sort((x, y) => x.order() - y.order());

  for (const task of taskList) {
    console.info('\n');
    console.info(`----- 执行 ${task.getTaskName()} -----`);
    const r = await task.run();
    if (r === false) {
      break;
    }
  }
})();
