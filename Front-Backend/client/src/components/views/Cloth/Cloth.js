const axios = require("axios"); //특정 Url의 HTML을 전부 가져옴.
const cheerio = require("cheerio"); // parsing하는 모듈

const getHTML = async (url, keyword) => {
  try {
    return await axios.get(
      "https://roughside.co.kr/product/list.html?" + encodeURI(keyword)
    );
  } catch (err) {
    console.log(err);
  }
};

const parsing = async (keyword) => {
  const html = await getHTML(keyword);
  // console.log(html);
  const $ = cheerio.load(html.data);
  const $courseList = $(".xans-product-normalpackage");

  let courses = [];
  $courseList.each((idx, node) => {
    const title = $(node).find(".text-item xans-record-");
    console.log(title);
  });
};
parsing(("https://www.ptry.co.kr/product/list.html?", (cate_no = 48)));
