const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.write("<html>");
  res.write("<body>");
  res.write("<center>");
  res.write(`${errorCode} | The page does not exist! `);
  res.write("</center>");
  res.write("</body>");
  res.write("</html>");
  res.send();
};

exports.respondInternalError = (req, res) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  res.status(errorCode);
  res.write("<html>");
  res.write("<head>");
  res.write("<meta charset='utf8'>");
  res.write("</head>");
  res.write("<body>");
  res.write("<center>");
  res.write(
    "<img src='https://images.twinkl.co.uk/tr/image/upload/illustation/soil-sample.png'>"
  );
  res.write("<br>");
  res.write("<h1>잘못된 페이지 요청입니다!</h1>");
  res.write("<br>");
  res.write("<a href='http://localhost:3000/'>홈으로</a>");
  res.write("</center>");
  res.write("</body>");
  res.write("</html>");
  res.send();
};
