export default {
  getNotionPage: id => {
    return fetch(`https://notion-api.splitbee.io/v1/page/${id}`).then(res =>
      res.json()
    );
  },
};
