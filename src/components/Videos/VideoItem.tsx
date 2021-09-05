import React from "react";
import { Video } from "./Video";
import ReactPlayer from "react-player";
import * as videoService from "./VideoService";

// import ReactPlayer from "react-player/youtube";
import "./VideoItem.css";
import { useHistory } from "react-router";

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
  const history = useHistory();

  const handelDelete = async (id: string) => {
    await videoService.deleteVideo(id);
    loadVideos();
  };

  return (
    <div className="col-md-4">
      <div className="card card-body video-card" style={{ cursor: "pointer" }}>
        <div className="d-flex justify-content-between">
          <h1 onClick={() => history.push(`/update/${video._id}`)}>
            {video.title}{" "}
          </h1>

          <span
            className="text-danger"
            onClick={() => video._id && handelDelete(video._id)}
          >
            X
          </span>
        </div>
        <p>{video.description}</p>

        <div className="card-body d-flex">
          <ReactPlayer url={video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
