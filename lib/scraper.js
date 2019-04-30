import axios from 'axios';
import cheerio from 'cheerio';

async function getUserHTML(user) {
  const { data: html } = await axios.get(`https://twitter.com/${user}`);
  return html;
}


async function getTwitterPosts(html) {
  // load up cheerio
  const $ = cheerio.load(html);
  // Get specific date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const DD = yesterday.getDate();
  const MMM = yesterday.toLocaleString('en-us', { month: 'short' });
  const keyword = `'${DD} ${MMM}'`;

  // Get tweets from user for specific date
  const tweets = $(`[title*=${keyword}]`).parents('.js-original-tweet');

  // Map tweets into an object
  const content = [];
  tweets.map(function (i, e) {
    const time = $(this).find('.tweet-timestamp').attr('title');
    const user = $(this).find('.username').children('b').text();
    const text = $(this).find('.tweet-text').text();
    const href = $(this).find('.tweet-timestamp').attr('href');
    const link = `https://twitter.com${href}`;

    content[i] = {
      time, user, text, link,
    };
  });

  // Reverse array for most recent tweets
  return content.reverse();
}

export { getUserHTML, getTwitterPosts };
