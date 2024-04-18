import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const tempMusicData = [
  {
    id: 1,
    title: "Harana",
    artist: "Parokya Ni Edgar",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Tabe",
    artist: "Carlos Agassi",
    genre: "Rap",
  },
  {
    id: 3,
    title: "Halik",
    artist: "Kamikazee",
    genre: "Rock",
  },
  {
    id: 4,
    title: "Circle Gets a Square",
    artist: "Cry Havoc",
    genre: "Pop Rock",
  },
  {
    id: 5,
    title: "Cry in The Rain",
    artist: "Cry Havoc",
    genre: "Acoustic Rock",
  },
  {
    id: 6,
    title: "Coal Keeps The Lights On",
    artist: "Jimmy Rose",
    genre: "Country",
  },
];

const tempPlaylist = [];

function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [searchQuery, setSearchQuery] = useState("");

  const addToPlaylist = (newMusic) => {
    setPlaylist([...playlist, newMusic]);
  };

  const removeFromPlaylist = (id) => {
    setPlaylist(playlist.filter((music) => music.id !== id));
  };

  const sortPlaylistByTitle = () => {
    const sortedPlaylist = [...playlist].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    
    setPlaylist(sortedPlaylist);
  };
  const sortPlaylistByArtist = () => {
    const sortedPlaylist = [...playlist].sort((a, b) => a.artist.localeCompare(b.artist));
    setPlaylist(sortedPlaylist);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMusic = music.filter((music) =>
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar music={music} handleSearch={handleSearch} />
      <Main
        music={filteredMusic}
        playlist={playlist}
        addToPlaylist={addToPlaylist}
        removeFromPlaylist={removeFromPlaylist}
        sortPlaylistByTitle={sortPlaylistByTitle}
        sortPlaylistByArtist={sortPlaylistByArtist}
      />
    </>
  );
}

function NavBar({ music, handleSearch }) {
  return (
    <nav className="container">
      <Logo />
      <Search handleSearch={handleSearch} />
      <NumberResult music={music} />
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>Vinyl Beats</h1>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnF3nmJzPY0AT9MECDQwf2s9HZC1H2NkQM2x5fZhwkKQ&s" alt="black vinyl" />
    </div>
  );
}

function NumberResult({ music }) {
  return (
    <div>
      <p>
        There are <strong>{music.length}</strong> songs
      </p>
    </div>
  );
}

function Search({ handleSearch }) {
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search music..."
        onChange={handleSearch}
      />
    </div>
  );
}

function Music({ music, addToPlaylist }) {
  return (
    <>
      <h2>Music List</h2>
      <ul>
        {music.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist} ({music.genre})
            <button onClick={() => addToPlaylist(music)}>
              Add to Playlist
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function Playlist({ playlist, removeFromPlaylist, sortPlaylistByTitle }) {
  const totalSongs = playlist.length;

  return (
    <>
      <h2>Playlist ({totalSongs} songs)</h2>
      <ul>
        {playlist.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist}
            <button onClick={() => removeFromPlaylist(music.id)}>Remove</button>
            <p>
              <span>⭐</span>
              <span>{music.rating}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Main({ music, playlist, addToPlaylist, removeFromPlaylist, sortPlaylistByTitle, sortPlaylistByArtist }) {
  return (
    <div className="container">
      <Box content={<Music music={music} addToPlaylist={addToPlaylist} />} />
      <Box
        content={<Playlist playlist={playlist} removeFromPlaylist={removeFromPlaylist} sortPlaylistByTitle={sortPlaylistByTitle} />}
      />
      <button onClick={sortPlaylistByTitle}>Sort by Title</button>
      <button onClick={sortPlaylistByArtist}>Sort by Artist</button>
    </div>
  );
}

function Box({ content }) {
  return <div className="container">{content}</div>;
}

export default App;