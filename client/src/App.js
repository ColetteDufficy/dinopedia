import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingModal from './components/LandingModal';
import Navbar from './components/Navbar';
import DinoTimeline from './components/DinoTimeline';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [allDinosaurs, setAllDinosaurs] = useState([]);
  const [hasLoadedAllDinosaurs, setHasLoadedAllDinosaurs] = useState(false);
  const [favDinosaurs, setFavDinosaurs] = useState([]);
  const [randomFacts, setRandomFacts] = useState([])
  const [creators, setCreators] = useState([])
  const savedFavs = window.localStorage.getItem('favDinoNames');

  // Load in dinosaurs from database at startup
  useEffect(() => {
    fetch('http://localhost:5000/api/dinosaurs/')
    .then(res => res.json())
    .then(data => {
      setAllDinosaurs(data);
      setHasLoadedAllDinosaurs(true);
    });
    console.log(
      `User has saved the following dinosaurs as favourites: ${savedFavs}`
    );
  }, []);

  // Load in random facts from database at startup
  useEffect(() => {
    fetch('http://localhost:5000/api/randomFacts/')
    .then(res => res.json())
    .then(data => {
      setRandomFacts(data);
    });
  }, []);

  // Load in Team Dinomite data from database at startup
  useEffect(() => {
    fetch('http://localhost:5000/api/creators/')
    .then(res => res.json())
    .then(data => {
      setCreators(data);
      console.log("facts data", data);
    });
  }, []);

  // When dinosaur list is populated, check for saved favourites in localStorage
  // and if they exist, pull them into the application's favourites list:
  useEffect(() => {
    if (savedFavs) {
      setFavDinosaurs(
        allDinosaurs.filter(dino => savedFavs.includes(dino.name))
      );
    }
  }, [allDinosaurs]);

  // If list of favourite dinosaurs (JSON) changes state, check if it's empty,
  // and if it isn't, write all of its dinosaur names to localStorage:
  useEffect(() => {
    if (hasLoadedAllDinosaurs === true) {
      window.localStorage.setItem(
        'favDinoNames',
        JSON.stringify(favDinosaurs.map(dino => dino.name))
      );
    }
  }, [favDinosaurs]);

  const handleAddFavDino = dinoId => {
    const foundFavDino = allDinosaurs.find(dinosaur => {
      return dinosaur._id === dinoId // comparing the ID object to the ID string
    });
    setFavDinosaurs([...favDinosaurs, foundFavDino]);
  }

  const handleRemoveFavDino = dinoId => {
    const filteredFavDinos = favDinosaurs.filter(favDinosaur => {
      return favDinosaur._id !== dinoId
    });
    setFavDinosaurs(filteredFavDinos);
  }

  return (
    <BrowserRouter>
      <LandingModal />
      <Navbar
        allDinosaurs={allDinosaurs}
        creators={creators}
        randomFacts={randomFacts}
        favDinosaurs={favDinosaurs}
      />
      <ScrollToTop/>
      <Routes>
        <Route
          path="/"
          element={
            <DinoTimeline
              allDinosaurs={allDinosaurs}
              handleAddFavDino={handleAddFavDino}
              handleRemoveFavDino={handleRemoveFavDino}
              favDinosaurs={favDinosaurs}
            />
          }
        />
        <Route
          path="/favourites"
          element={

            <DinoTimeline
              allDinosaurs={favDinosaurs}
              handleAddFavDino={handleAddFavDino}
              handleRemoveFavDino={handleRemoveFavDino}
              favDinosaurs={favDinosaurs}
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
