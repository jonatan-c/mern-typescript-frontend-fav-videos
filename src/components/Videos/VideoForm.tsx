import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Video } from "./Video";
import * as videoService from "./VideoService";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
  id: string;
}

const VideoForm = () => {
  const history = useHistory();
  const params = useParams<Params>();

  const initialState = {
    title: "",
    description: "",
    url: "",
  };
  const [video, setVideo] = useState<Video>(initialState);

  const { title, description, url } = video;

  const handleInputChange = (e: InputChange) => {
    setVideo({
      ...video,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!params.id) {
      await videoService.createVideo(video);
      toast.success("Nuevo video agregado correctamente");
      setVideo(initialState);
      //opcion b) poner todo en blanco -> setVideo(itialstate)
    } else {
      await videoService.updateVideo(params.id, video);
    }

    history.push("/");
  };

  const getVideo = async (id: string) => {
    const res = await videoService.getVideo(id);
    const { title, description, url } = res.data;
    setVideo({ title, description, url });
  };

  useEffect(() => {
    if (params.id) getVideo(params.id);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="card">
            <div className="card-body">
              <h3>New Video</h3>

              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <input
                    type="text"
                    name="title"
                    placeholder="Escribi aca ..."
                    className="form-control"
                    autoFocus
                    value={title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-control">
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Escribe una descripcion"
                    className="form-control"
                    value={description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="form-control">
                  <input
                    type="text"
                    name="url"
                    placeholder="https://tuurlvaaca.com"
                    className="form-control"
                    value={url}
                    onChange={handleInputChange}
                  />
                </div>

                {params.id ? (
                  <button className="btn btn-info">Actualizar video</button>
                ) : (
                  <button className="btn btn-primary">Crear Video</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoForm;
