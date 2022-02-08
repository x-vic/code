const puppeteer = require("puppeteer");

// const account = JSON.parse(process.env.npm_config_argv).remain[0];
// const password = JSON.parse(process.env.npm_config_argv).remain[1];
const account = '18373209286';
const password = 'mxuan.241';
const giteePages = "https://gitee.com/x-vic/code/pages";

const delay = timer => new Promise(resolve => setTimeout(resolve, timer));

const doLogin = async () => {
  const browser = await puppeteer.launch({
    // headless: false
  });

  const page = await browser.newPage();
  await page.goto("https://gitee.com/login");
  await page.setViewport({
    width: 1920,
    height: 900
  });

  await page.focus("#user_login");
  await page.keyboard.sendCharacter(account);
  await page.focus("#user_password");
  await page.keyboard.sendCharacter(password);
  await page.click(".submit");
  await delay(2 * 1000);
  await page.goto(giteePages);
  page.on("dialog", async dialog => {
    await dialog.accept();
    await delay(5 * 1000);
    await browser.close();
    console.log(` 发布成功 `);
  });
  await page.click(".redeploy-button");
};

doLogin();


// console.log('process.env.npm_config_argv', JSON.parse(process.env.npm_config_argv).remain)
