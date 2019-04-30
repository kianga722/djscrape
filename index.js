import { getUserHTML, getTwitterPosts } from './lib/scraper';

const djs = [
  'alesso',
  'zedd',
  'martingarrix',
  'illeniummusic',
  'gryffinofficial',
  'tiesto',
];

djs.forEach(async (dj) => {
  const html = await getUserHTML(dj);
  const tweets = await getTwitterPosts(await html);
  console.log(tweets);
});
