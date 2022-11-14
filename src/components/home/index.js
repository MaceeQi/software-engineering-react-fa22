import React from "react";
import Tuits from "../tuits";
import * as tuitsService from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import * as service from "../../services/auth-service";

const Home = () => {
  const location = useLocation();
  const {uid} = useParams();
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState('');
  const [user, setUser] = useState({});
  let userId = user._id;

  const findTuits = () => {
    if(userId !== undefined) {
      return tuitsService.findTuitByUser(userId)
        .then(tuits => setTuits(tuits))
    } else {
      return tuitsService.findAllTuits()
        .then(tuits => setTuits(tuits))
    }
  }

  const findUser = async () => {
    try {
      const currentUser = await service.profile();
      setUser(currentUser);
      userId = currentUser._id;
    } catch (e) {
      console.log("No one logged in");
    }
  }

  useEffect(async () => {
    let isMounted = true;
    await findUser();
    findTuits();
    return () => {isMounted = false;}
  }, []);

  const createTuit = () =>
      tuitsService.createTuit(userId, {tuit})
          .then(findTuits)

  const deleteTuit = (tid) =>
      tuitsService.deleteTuit(tid)
          .then(findTuits)

  return(
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        {
          userId &&
          <div className="d-flex">
            <div className="p-2">
              <img className="ttr-width-50px rounded-circle"
                   src={require(`../../images/${user.username}.jpg`)}/>
            </div>
            <div className="p-2 w-100">
              <textarea
                  onChange={(e) =>
                      setTuit(e.target.value)}
                placeholder="What's happening?"
                className="w-100 border-0"></textarea>
              <div className="row">
                <div className="col-10 ttr-font-size-150pc text-primary">
                  <i className="fas fa-portrait me-3"></i>
                  <i className="far fa-gif me-3"></i>
                  <i className="far fa-bar-chart me-3"></i>
                  <i className="far fa-face-smile me-3"></i>
                  <i className="far fa-calendar me-3"></i>
                  <i className="far fa-map-location me-3"></i>
                </div>
                <div className="col-2">
                  <a onClick={createTuit}
                     className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}>
                    Tuit
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
    </div>
  );
};
export default Home;