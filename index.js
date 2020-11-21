const axios = require('lodash');

(async function () {
  console.info(' ----- start send message ----- ');

  const config = {
    method: 'get',
    url:
      'https://sc.ftqq.com/SCU128554Tbe9dfc1fc5535435744cfdb3b6d348c05fb8c1a009856.send?text=%E4%B8%BB%E4%BA%BA%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%8F%88%E6%8C%82%E6%8E%89%E5%95%A6~1',
    headers: {
      Cookie: 'PHPSESSID=5c1dc3a66a29d552391f8608b312b3e7',
    },
  };

  await axios(config);
  console.info(' ----- send message successful ----- ');
})();
