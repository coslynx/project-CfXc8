Here is the code for each file in the project structure:

**project-root/src/commands/music.js:**
```javascript
const ytdl = require('ytdl-core');
const Spotify = require('node-spotify-api');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { getPlaylist } = require('../utils/database');

const spotify = new Spotify({
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET
});

async function play(message, args) {
  // Logic for playing music
}

function pause(message) {
  // Logic for pausing music
}

function resume(message) {
  // Logic for resuming music
}

function skip(message) {
  // Logic for skipping to the next song
}

async function queue(message, args) {
  // Logic for adding a song to the queue
}

function volume(message, args) {
  // Logic for adjusting the playback volume
}

function stop(message) {
  // Logic for stopping playback and leaving the voice channel
}

module.exports = {
  play,
  pause,
  resume,
  skip,
  queue,
  volume,
  stop
};
```

**project-root/src/commands/playlist.js:**
```javascript
const { createPlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist, savePlaylist, loadPlaylist } = require('../utils/database');

function create(message, args) {
  // Logic for creating a playlist
}

function delete(message, args) {
  // Logic for deleting a playlist
}

function add(message, args) {
  // Logic for adding a song to a playlist
}

function remove(message, args) {
  // Logic for removing a song from a playlist
}

function save(message, args) {
  // Logic for saving a playlist
}

function load(message, args) {
  // Logic for loading a playlist
}

function play(message, args) {
  // Logic for playing a playlist
}

module.exports = {
  create,
  delete,
  add,
  remove,
  save,
  load,
  play
};
```

**project-root/src/commands/admin.js:**
```javascript
const { setSetting } = require('../utils/database');

function setprefix(message, args) {
  // Logic for setting the bot's command prefix
}

function setvolume(message, args) {
  // Logic for setting the default volume
}

// Additional admin commands

module.exports = {
  setprefix,
  setvolume
  // Additional admin commands
};
```

**project-root/src/utils/lyrics.js:**
```javascript
const axios = require('axios');
const Genius = require('genius-lyrics-api');

const genius = new Genius(process.env.GENIUS_API_KEY);

async function fetchLyrics(songTitle, artist) {
  // Logic for fetching lyrics from the Genius API
}

module.exports = {
  fetchLyrics
};
```

**project-root/src/utils/database.js:**
```javascript
const sqlite3 = require('sqlite3').verbose();

function createPlaylist(playlistData) {
  // Logic for saving a playlist to the database
}

function getPlaylist(playlistName) {
  // Logic for retrieving a playlist from the database
}

function deletePlaylist(playlistName) {
  // Logic for deleting a playlist from the database
}

function setSetting(key, value) {
  // Logic for setting a server setting in the database
}

function getSetting(key) {
  // Logic for retrieving a server setting from the database
}

module.exports = {
  createPlaylist,
  getPlaylist,
  deletePlaylist,
  setSetting,
  getSetting
};
```

**project-root/src/events/messageHandlers.js:**
```javascript
const { play, pause, resume, skip, queue, volume, stop } = require('../commands/music');
const { create, delete, add, remove, save, load, play } = require('../commands/playlist');
const { setprefix, setvolume } = require('../commands/admin');

function onMessageCreate(message) {
  // Logic for parsing and executing commands based on message content
}

module.exports = {
  onMessageCreate
};
```

**project-root/src/events/voiceHandlers.js:**
```javascript
const { onVoiceStateUpdate } = require('../commands/music');

function onVoiceStateUpdate(oldState, newState) {
  // Logic for handling voice state updates
}

module.exports = {
  onVoiceStateUpdate
};
```

**project-root/src/index.js:**
```javascript
const Discord = require('discord.js');
const dotenv = require('dotenv');
const { onMessageCreate } = require('./events/messageHandlers');
const { onVoiceStateUpdate } = require('./events/voiceHandlers');
const { createPlaylist, getPlaylist, deletePlaylist, setSetting, getSetting } = require('./utils/database');

dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', onMessageCreate);
client.on('voiceStateUpdate', onVoiceStateUpdate);

async function main() {
  // Load environment variables from .env file
  dotenv.config();

  // Create a Discord client instance
  const client = new Discord.Client();

  // Load all commands from the commands folder
  const commands = require('./commands');
  client.commands = commands;

  // Load all event handlers from the events folder
  const eventHandlers = require('./events');
  eventHandlers.load(client);

  // Log in the bot to Discord
  client.login(process.env.TOKEN);
}

main();

module.exports = client;
```

**project-root/config.json:**
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

**project-root/.env:**
```
TOKEN=YOUR_BOT_TOKEN
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
GENIUS_API_KEY=YOUR_GENIUS_API_KEY
DATABASE_URL=YOUR_DATABASE_URL
```

**project-root/deploy.sh:**
```bash
#!/bin/bash

# Deployment script for the bot

# Replace the following commands with your deployment steps

echo "Deploying the bot..."
echo "Step 1: Clone the repository"
git clone git@github.com:your-username/your-repo.git
cd your-repo

echo "Step 2: Install dependencies"
npm install

echo "Step 3: Build the bot"
npm run build

echo "Step 4: Start the bot"
npm start

echo "Deployment completed!"
```

**project-root/README.md:**
```
# Discord Bot

## Description

This is a Discord bot for playing music, managing playlists, and performing administrative tasks.

## Installation

1. Clone the repository:

   ```
   git clone git@github.com:your-username/your-repo.git
   ```

2. Install dependencies:

   ```
   cd your-repo
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file and add the following variables:

   ```
   TOKEN=YOUR_BOT_TOKEN
   YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
   SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
   SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
   GENIUS_API_KEY=YOUR_GENIUS_API_KEY
   DATABASE_URL=YOUR_DATABASE_URL
   ```

4. Start the bot:

   ```
   npm start
   ```

## Usage

- Use the `play` command to play music from various sources.
- Use the `pause` command to pause the currently playing song.
- Use the `resume` command to resume playback of a paused song.
- Use the `skip` command to skip to the next song in the queue.
- Use the `queue` command to add a song to the queue from a provided URL.
- Use the `volume` command to adjust the playback volume.
- Use the `stop` command to stop playback, clear the queue, and leave the voice channel.

For more information, use the `help` command.

## Contributing

Contributions are welcome! Please create a pull request with your changes.

## License

[MIT](LICENSE)
```

**project-root/.gitignore:**
```
node_modules
config.json
.env
```