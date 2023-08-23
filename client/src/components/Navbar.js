import React, { useState } from "react";
import { Styles } from "react-modal";
import styles from "./LandingModal.css";
import './Navbar.css'
import Search from './Search';
import Player from './Audio';
import {Link, Outlet, useMatch, useResolvedPath, NavLink} from 'react-router-dom';
import type {LinkProps} from "react-router-dom";
import Modal from "react-modal";
import RandomFact from "./RandomFact";
import CreatorsModal from "./CreatorsModal";
import DinoAdLibs from "./DinoAdLib";

const Navbar = ({allDinosaurs, randomFacts, creators}) => {

  function CustomLink({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <div>
        <Link
          style={{ color: match ? "orange" : "white" }}
          to={to}
          {...props}
        >
          {children}
        </Link>
        {match && ""}
      </div>
    );
  }

 
  return (  
    <nav className="navbar">
    <div className="logo-and-name">
      <div className="logo">
        <Player />
      </div>
      <div className="logo-name"><Link to="/">Dinopedia</Link></div>
    </div>
      <div className="nav-items">
          <RandomFact randomFacts={randomFacts} />
          <DinoAdLibs />
          <div className="favourite-dino-link">
            <CustomLink to="/favourites">
              Favourites
              {/* <img
              className="tiny-dino"
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/322/sauropod_1f995.png"
              alt="tiny dino"
              /> */}
            </CustomLink>
          </div>
          <CreatorsModal creators={creators} />
      </div>
      <Search allDinosaurs={allDinosaurs} />
    </nav>
  );
}

export default Navbar;
