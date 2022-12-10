import "./styles.css";
import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";

export default function App() {
  const [villagers, setVillagers] = useState([]);
  //current villager is used to load details on clicked villager
  const [currentVillager, setcurrentVillager] = useState("");
  //set favorite villager array
  const [favoriteVillagers, setfavoriteVillagers] = useState([]);
  //set island villagers array
  const [islandVillagers, setislandVillagers] = useState([]);
  //modal setup
  const [showModal, setModalOpen] = useState(false);
  //modal setup to show favorite villagers
  const [favModal, setFavModal] = useState(false);
  //modal setup for island villagers
  const [islandModal, setislandModal] = useState(false);

  useEffect(() => {
    //load villagers into a list
    fetch("data/data.json")
      .then((result) => result.json())
      .then((data) => {
        //console.log(data);
        setVillagers(data);
        //console.log(data);
      });
  });

  //villager list using map, display the villager name and icon
  //display all villagers in a grid
  const villagerList = villagers.map((villager) => (
    //div on click will show details of villager
    <div
      className="villager"
      onClick={() => {
        showVillagerInfo(villager);
      }}
    >
      <div id="villager-icon">
        <img src={villager.icon} alt={villager.Name} />
      </div>
      <div id="villager-name">{villager.Name}</div>
    </div>
  ));

  const favVillagerList = favoriteVillagers.map((villager) => (
    //div on click will show details of villager
    <div
      className="villager"
      onClick={() => {
        showVillagerInfo(villager);
      }}
    >
      <div id="villager-icon">
        <img src={villager.icon} alt={villager.Name} />
      </div>
      <div id="villager-name">{villager.Name}</div>
    </div>
  ));

  const islandVillagerList = islandVillagers.map((villager) => (
    //div on click will show details of villager
    <div
      className="villager"
      onClick={() => {
        showVillagerInfo(villager);
      }}
    >
      <div id="villager-icon">
        <img src={villager.icon} alt={villager.Name} />
      </div>
      <div id="villager-name">{villager.Name}</div>
    </div>
  ));

  //add villager into a list of favorites that can be accessed from a list
  //villagers bounce when hovered over
  //favorites and current island villagers tab at side that slides out
  //fix icon/name sizes

  //when villager is picked,  open modal with information about that villager
  function showVillagerInfo(villager) {
    setcurrentVillager(villager);
    //console.log(currentVillager);
    setModalOpen(true);
    //console.log(currentVillager);
  }

  return (
    <div className="App">
      <Modal
        open={favModal}
        onClose={() => {
          setFavModal(false);
        }}
      >
        <div id="infoBox">{favVillagerList}</div>
      </Modal>
      <Modal
        open={islandModal}
        onClose={() => {
          setislandModal(false);
        }}
      >
        <div id="infoBox">{islandVillagerList}</div>
      </Modal>
      <Modal
        open={showModal}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div id="infoBox">
          <button
            onClick={() => {
              setfavoriteVillagers([...favoriteVillagers, currentVillager]);
              //!search through array to see if villager has already been added
            }}
          >
            Add to Favorites
          </button>
          <button
            onClick={() => {
              setislandVillagers([...islandVillagers, currentVillager]);
              //!search through array to see if villager has already been added
            }}
          >
            Add to Island
          </button>
          <h3>{currentVillager.Name}</h3>
          <img src={currentVillager.img} alt={currentVillager.Name} />
          <p>{currentVillager.Species}</p>
          <p>{currentVillager.Gender}</p>
          <p>{currentVillager.Personality}</p>
          <p>Hobby: {currentVillager.Hobby}</p>
          <p>Birthday: {currentVillager.Birthday}</p>
          <p>Catchphrase: "{currentVillager.Catchphrase}"</p>
          <p>Favorite Song: {currentVillager.Favoritesong}</p>
          <p>
            Styles: {currentVillager.Styleone}, {currentVillager.Styletwo}
          </p>
          <p>
            Colors: {currentVillager.Colorone}, {currentVillager.Colortwo}
          </p>
        </div>
      </Modal>
      <h1>Villager Database</h1>
      <button
        id="favorites-button"
        onClick={() => {
          console.log("favorites");
          console.log(favoriteVillagers);
          setFavModal(true);
        }}
      >
        ☆Favorites
      </button>
      <button
        id="my-island-button"
        onClick={() => {
          console.log("my island");
          console.log(islandVillagers);
          setislandModal(true);
        }}
      >
        ☆My Island
      </button>
      <button
        onClick={() => {
          setfavoriteVillagers([]);
          console.log(favoriteVillagers);
        }}
      >
        Clear Favorites
      </button>
      <button
        onClick={() => {
          setislandVillagers([]);
          console.log(islandVillagers);
        }}
      >
        Clear Island
      </button>
      <div id="villagers">{villagerList}</div>
    </div>
  );
}
