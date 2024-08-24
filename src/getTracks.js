import Genius from "genius-lyrics";
const Client = new Genius.Client();

export async function getTracks(query) {
  const searches = await Client.songs.search(query);

  // // Ok lets get the lyrics
  const promises = searches.map(async song => {
    let lyrics = await song.lyrics();
    return {
      type: "article",
      id: song.endpoint,
      title: song.title,
      input_message_content: {
        message_text: `${song.fullTitle} \n ${lyrics}`,
      },
      description: song.artist.name,
      thumb_url: song.thumbnail,
      thumb_width: 300,
      thumb_height: 300,
    };
  });
  const result = await Promise.all(promises);
  return result;
}
function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#\+\-=|{}.!]/g, "\\$&");
}
