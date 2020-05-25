const handlers = {
  postParams: async (req, res) => {
    const paramValue = req.params.value;
    try {
      await console.log(`param value: ${paramValue}`);

      const responseData = {
        paramValue,
      };
      res.json(responseData);
    } catch (err) {
      console.error("there is an error!!!");
    }
  },
  postQuery: async (req, res) => {
    const queryValue = req.query.value;
    try {
      await console.log(`query value: ${queryValue}`);
      const responseData = {
        queryValue,
      };
      res.json(responseData);
    } catch (err) {
      console.error("there is an error !!!");
    }
  },
  getBody: async (req, res) => {
    const bodyValue = req.body.value;
    try {
      await console.log(`body value: ${bodyValue}`);

      const responseData = {
        bodyValue,
      };
      res.json(responseData);
    } catch (error) {
      console.error("there is an error !!!");
    }
  },
};
module.exports = handlers;
