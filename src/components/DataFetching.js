import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Data.css";
import {motion} from 'framer-motion'

function DataFetching() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.sportsdata.io/v3/nba/scores/json/Players?key=fa0bcfff8bc041ae8a2a1ffe9c9aa227"
      )
      .then((res) => {
        // console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>

      <input
        className="input"
        type="text"
        placeholder="Insert player name"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="container">
        {posts
          .filter((post) => post.FirstName && post.LastName.includes(query))
          .map((post) => (
            <div className="child" key={post.PlayerID}>
              <h3>
                {post.FirstName} {post.LastName}
              </h3>

              <p>{post.City}</p>
              <p>Team {post.Team}</p>

              <img className="image" src={post.PhotoUrl} alt="icons" />
              <p>Possition "{post.Position}"</p>
              <div> {post.Salary ? <p>{parseInt(post.Salary)/1000000} M $</p> : null }</div>
              <p>Birth Country: {post.BirthCountry}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DataFetching;
