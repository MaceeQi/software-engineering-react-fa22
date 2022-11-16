import React from "react";

const TuitStats = ({tuit, likeTuit}) => {

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
                    {/* Likes > 0: render solid red heart */}
                    {
                        tuit.stats.likes > 0 &&
                        <i className="bi bi-heart-fill text-danger"></i>
                    }
                    {/* Likes <= 0: render empty heart */}
                    {
                        tuit.stats.likes <= 0 &&
                        <i className="bi bi-heart"></i>
                    }

                    <span className="ms-2">
                        {tuit.stats && tuit.stats.likes}
                    </span>
                </span>
            </div>

            {/* Dislikes */}
            {/*<div className="col">*/}
            {/*    <span>*/}
            {/*        <i onClick={() => dispatch(updateTuitThunk({*/}
            {/*                                                       ...post,*/}
            {/*                                                       disliked: true,*/}
            {/*                                                       dislikes: (post.dislikes === undefined ? 1 : post.dislikes + 1)*/}
            {/*                                                   }))}*/}
            {/*           className={`bi ${post.disliked ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'}`}></i>*/}
            {/*    </span>*/}
            {/*    <span className="ms-2">*/}
            {/*        {post.dislikes === undefined ? '0' : post.dislikes}*/}
            {/*    </span>*/}
            {/*</div>*/}

            {/* Share */}
            <div className="col">
                <i className="bi bi-upload"></i>
            </div>
        </div>
    );
};
export default TuitStats;