import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";

const Tuits = ({tuits = [], deleteTuit, refreshTuits}) => {

    // Callback to toggle tuit's likes count - send req to REST API, on res refresh screen
    const likeTuit = (tuit) =>
        likesService.userTogglesTuitLikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    // Callback to toggle tuit's dislikes count - send req to REST API, on res refresh screen
    const dislikeTuit = (tuit) =>
        likesService.userTogglesTuitDislikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          tuits.map && tuits.map(tuit => {
            return (
              <Tuit key={tuit._id}
                    deleteTuit={deleteTuit}
                    likeTuit={likeTuit}
                    dislikeTuit={dislikeTuit}
                    tuit={tuit}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;