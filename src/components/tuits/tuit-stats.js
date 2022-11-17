import React from "react";

const TuitStats = ({tuit, likeTuit, dislikeTuit}) => {

    return(
        <div className="row mt-2">
            {/* Replies */}
            <div className="col">
                <span>
                    <i className="bi bi-chat"></i>
                </span>
                <span className="ms-2">
                    {tuit.stats.replies === undefined ? '0' : tuit.stats.replies}
                </span>
            </div>

            {/* Retuits */}
            <div className="col">
                <span className="position-relative">
                    <span className="position-absolute ttr-nudge-up">
                        <i className="bi bi-arrow-90deg-right"></i>
                    </span>
                    <span className=" position-absolute ttr-nudge-down">
                        <i className="bi bi-arrow-return-left"></i>
                    </span>
                </span>
                <span className="ms-4">
                    {tuit.stats.retuits === undefined ? '0' : tuit.stats.retuits}
                </span>
            </div>

            {/* Likes */}
            <div className="col">
                {/* Callback toggle like tuit on click and force screen to refresh */}
                <span onClick={() => likeTuit(tuit)}>
                    {/* Likes > 0: render solid thumbs up */}
                    {
                        tuit.stats.likes > 0 &&
                        <i className="bi bi-hand-thumbs-up-fill text-danger" title="solid thumbs up"></i>
                    }
                    {/* Likes <= 0: render empty thumbs up */}
                    {
                        tuit.stats.likes <= 0 &&
                        <i className="bi bi-hand-thumbs-up" title="empty thumbs up"></i>
                    }

                    <span className="ms-2">
                        {tuit.stats && tuit.stats.likes}
                    </span>
                </span>
            </div>

            {/* Dislikes */}
            <div className="col">
                {/* Callback toggle dislike tuit on click and force screen to refresh */}
                <span onClick={() => dislikeTuit(tuit)}>
                    {/* Dislikes > 0: render solid thumbs down */}
                    {
                        tuit.stats.dislikes > 0 &&
                        <i className="bi bi-hand-thumbs-down-fill text-danger" title="solid thumbs down"></i>
                    }
                    {/* Dislikes <= 0: render empty thumbs down */}
                    {
                        tuit.stats.dislikes <= 0 &&
                        <i className="bi bi-hand-thumbs-down" title="empty thumbs down"></i>
                    }

                    <span className="ms-2">
                        {tuit.stats && tuit.stats.dislikes}
                    </span>
                </span>
            </div>

            {/* Share */}
            <div className="col">
                <i className="bi bi-upload"></i>
            </div>
        </div>
    );
};
export default TuitStats;