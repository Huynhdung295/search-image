import React, { useEffect, useRef, useState } from "react";
import superagent from "superagent";

import "./GalleryStyle.css";

function Gallery() {
  const ACCESS_KEY = "U1VRLuN514MI_GbfTOhinH6aPTxuV3LQi8ariNvnojM";
  const getAPI = (opt) => {
    superagent.get(opt.url).then((res) => {
      if (opt.successUpload) opt.successUpload(res);
    }).catch((err)=> {
      console.log(err);
    });
  };
  let [photos, setPhotos] = useState([]);
  let [setup, setSetup] = useState("");
  const setInput = useRef();

  const per_page = 10;
  const url = `https://api.unsplash.com/photos/random/?count=${per_page}&client_id=${ACCESS_KEY}`;

  useEffect(() => {
    const imgURL = setup ? `${url}&query=${setup}` : url;
    getAPI({
      url: imgURL,
      successUpload: (res) => setPhotos(res.body),
    });
  }, [setup, url]);

  const searchPhotos = (e) => {
    e.preventDefault();
    setSetup(setInput.current.value);
  };

  const handleSubmit = () => {
    setSetup(setInput.current.value);
  }
  const renderPhotos = photos.map((photo) => {
    return (
      <li
        onClick={()=> console.log(photo)}
        key={photo.id}
      >
        <img
          src={photo.urls.regular}
          // alt={photo.alt_description}
          alt={""}
        />
      </li>
    );
  });

  return (
    <div className="box">
      <form className="form" onSubmit={searchPhotos}>
        <label style={{marginRight: "15px"}}>
          Search Photos on Unsplash
        </label>
        <input
            ref={setInput}
            placeholder="Nhập vào nội dung bạn muốn tìm kiếm"
            type="search"
            className="input"
            defaultValue=""
          />
        <input onClick={handleSubmit} value="SEARCH" type="submit" className="btn-submit" />
      </form>

      <ul className="photo-grid">{renderPhotos}</ul>
    </div>
  );
}

export default Gallery;
