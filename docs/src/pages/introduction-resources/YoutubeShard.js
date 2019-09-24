import React from "react";
import BaseShard from "@fa-repo/shard-editor/dist/base-shard";
import "./YoutubeShard.scss";

const VideoShard = props => {
  return (
    <BaseShard
      type="youtube"
      renderer={sourceObject => {
        const { height = 315, width = 560, videoId = "" } = sourceObject;
        return (
          <iframe
            width={width}
            height={height}
            src={videoId && "https://www.youtube.com/embed/" + videoId}
            allowFullScreen
          ></iframe>
        );
      }}
      editor={({ sourceObject, change }) => {
        return (
          <>
            <div>
              <label>videoId:</label>
              <input
                type="text"
                value={sourceObject.videoId}
                onChange={e => change({ ...sourceObject, videoId: e.target.value })}
              />
            </div>
            <div>
              <label>height:</label>
              <input
                type="number"
                value={sourceObject.height}
                onChange={e => change({ ...sourceObject, height: e.target.value })}
              />
            </div>
            <div>
              <label>width:</label>
              <input
                type="number"
                value={sourceObject.width}
                onChange={e => change({ ...sourceObject, width: e.target.value })}
              />
            </div>
          </>
        );
      }}
      {...props}
    />
  );
};

export default VideoShard;
