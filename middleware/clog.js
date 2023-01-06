// Color coordinated messages for the three utilized request methods that display in the terminal when each method is used locally"
const clog = (req, res, next) => {
  const fgCyan = '\x1b[36m';
  switch (req.method) {
    case 'GET': {
      console.info(`📗 ${fgCyan}${req.method} request to ${req.path}`);
      break;
    }
    case 'POST': {
      console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
      break;
    }
    default:
      console.log(`📙${fgCyan}${req.method} request to ${req.path}`);
  }

  next();
};

module.exports = clog;