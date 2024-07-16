Filename: index.js

```javascript
const Discord = require('discord.js');
const dotenv = require('dotenv');
const { onMessageCreate } = require('./events/messageHandlers');
const { onVoiceStateUpdate } = require('./events/voiceHandlers');
const { loadAllCommands } = require('./utils/commandLoader');

dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', onMessageCreate);
client.on('voiceStateUpdate', onVoiceStateUpdate);

loadAllCommands(client);

client.login(process.env.BOT_TOKEN);
```

Filename: commands/music.js

```javascript
const { play, pause, resume, skip, queue, volume, stop } = require('../utils/musicPlayer');

module.exports = {
  name: 'music',
  description: 'Commands related to music playback',
  play,
  pause,
  resume,
  skip,
  queue,
  volume,
  stop
};
```

Filename: commands/playlist.js

```javascript
const { create, delete, add, remove, save, load, play } = require('../utils/playlistManager');

module.exports = {
  name: 'playlist',
  description: 'Commands related to managing playlists',
  create,
  delete,
  add,
  remove,
  save,
  load,
  play
};
```

Filename: commands/admin.js

```javascript
const { setprefix, setvolume } = require('../utils/adminCommands');

module.exports = {
  name: 'admin',
  description: 'Commands that require administrative permissions',
  setprefix,
  setvolume
};
```

Filename: utils/lyrics.js

```javascript
const axios = require('axios');
const Genius = require('genius-lyrics-api');

const fetchLyrics = async (songTitle, artist) => {
  const options = {
    apiKey: process.env.GENIUS_API_KEY,
    title: songTitle,
    artist: artist,
    optimizeQuery: true
  };

  try {
    const lyricsData = await Genius.getLyrics(options);
    return lyricsData.lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};

module.exports = { fetchLyrics };
```

Filename: utils/database.js

```javascript
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('database.db');

const createPlaylist = (playlistData) => {
  // Implementation for saving a playlist to the database
};

const getPlaylist = (playlistName) => {
  // Implementation for retrieving a playlist from the database
};

const deletePlaylist = (playlistName) => {
  // Implementation for deleting a playlist from the database
};

const setSetting = (key, value) => {
  // Implementation for setting a server setting in the database
};

const getSetting = (key) => {
  // Implementation for retrieving a server setting from the database
};

module.exports = {
  createPlaylist,
  getPlaylist,
  deletePlaylist,
  setSetting,
  getSetting
};
```

Filename: events/messageHandlers.js

```javascript
const { prefix } = require('../config.json');
const { play, pause, resume, skip, queue, volume, stop } = require('../commands/music');
const { create, delete, add, remove, save, load, play } = require('../commands/playlist');
const { setprefix, setvolume } = require('../commands/admin');

const onMessageCreate = (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'play':
      play(message, args);
      break;
    case 'pause':
      pause(message);
      break;
    case 'resume':
      resume(message);
      break;
    case 'skip':
      skip(message);
      break;
    case 'queue':
      queue(message, args);
      break;
    case 'volume':
      volume(message, args);
      break;
    case 'stop':
      stop(message);
      break;
    case 'create':
      create(message, args);
      break;
    case 'delete':
      delete(message, args);
      break;
    case 'add':
      add(message, args);
      break;
    case 'remove':
      remove(message, args);
      break;
    case 'save':
      save(message, args);
      break;
    case 'load':
      load(message, args);
      break;
    case 'playplaylist':
      play(message, args);
      break;
    case 'setprefix':
      setprefix(message, args);
      break;
    case 'setvolume':
      setvolume(message, args);
      break;
    default:
      message.reply('Invalid command');
      break;
  }
};

module.exports = { onMessageCreate };
```

Filename: events/voiceHandlers.js

```javascript
const { onVoiceStateUpdate } = require('../commands/music');

module.exports = { onVoiceStateUpdate };
```

Filename: index.js

```javascript
const Discord = require('discord.js');
const dotenv = require('dotenv');
const { onMessageCreate } = require('./events/messageHandlers');
const { onVoiceStateUpdate } = require('./events/voiceHandlers');
const { loadAllCommands } = require('./utils/commandLoader');

dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', onMessageCreate);
client.on('voiceStateUpdate', onVoiceStateUpdate);

loadAllCommands(client);

client.login(process.env.BOT_TOKEN);
```

Filename: config.json

```json
{
  "token": "YOUR_BOT_TOKEN",
  "youtube_api_key": "YOUR_YOUTUBE_API_KEY",
  "spotify_client_id": "YOUR_SPOTIFY_CLIENT_ID",
  "spotify_client_secret": "YOUR_SPOTIFY_CLIENT_SECRET",
  "genius_api_key": "YOUR_GENIUS_API_KEY",
  "database_url": "YOUR_DATABASE_URL", 
  "prefix": "!", 
  "default_volume": 0.5
}
```

Filename: .env

```
BOT_TOKEN=YOUR_BOT_TOKEN
GENIUS_API_KEY=YOUR_GENIUS_API_KEY
```

Filename: deploy.sh

```bash
#!/bin/bash

# Deployment script for your bot
# Add necessary commands to deploy your bot to a server (e.g., Heroku, AWS)
```

Filename: README.md

```
# Discord Music Bot

## Description

This Discord bot allows users to play music from various sources, manage playlists, and perform administrative commands. It integrates with YouTube, Spotify, and other music platforms to provide a seamless music playback experience within Discord voice channels.

## Installation

1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Create a `config.json` file based on the provided example and fill in the necessary values.
4. Create a `.env` file and add your bot token and other sensitive information.
5. Run the bot using `node index.js`.

## Usage

- Use the provided commands to play, pause, resume, skip, and adjust the volume of music playback.
- Create and manage playlists with custom names.
- Set the bot's prefix and default volume using administrative commands.

## Contributing

Contributions are welcome! Please follow the existing code style and submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
```

Filename: .gitignore

```
node_modules
config.json
.env
database.db
```