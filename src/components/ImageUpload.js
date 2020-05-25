import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { setImage as setImageAction } from 'services/productList/actions';
import { connect } from 'react-redux';

const ImageUpload = ({ url, getImageFile }) => {
  const [preview, setPreview] = useState(url);
  const [message, setMessage] = useState({
    isMessage: false,
    isWarning: false,
    messageText: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file.size > 300000) {
      setMessage({
        isMessage: true,
        isWarning: true,
        messageText: 'Size of file is too big. Files should weigh less than 300kB',
      });
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage({
        isMessage: true,
        isWarning: false,
        messageText: 'Image selected',
      });
      getImageFile(file);
      // setImage(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap mb-6">
      <label
        className="block md:w-full uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="file"
      >
        Product image
      </label>
      {message.isMessage && (
        <span
          className={`py-2 px-6 block text-sm md:text-base md:w-full rounded shadow mb-6 ${
            message.isWarning ? 'bg-red-200 text-red-400' : 'bg-green-200 text-green-600'
          }`}
        >
          {message.messageText}
        </span>
      )}
      <div className="w-full md:w-1/2 pr-6">
        {preview && (
          <img className="animated-img shadow rounded mb-6" src={preview} alt="product_image" />
        )}
        {!preview && (
          <label
            htmlFor="file"
            className="animated-img flex justify-center items-center h-32 w-32 rounded mb-6 bg-gray-200 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="37" viewBox="0 0 20 16">
              <path
                id="icon-image"
                d="M4,4H20a2,2,0,0,1,2,2V18a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2.006,2.006,0,0,1,4,4Zm16,8.59V6H4v6.59l4.3-4.3a1,1,0,0,1,1.4,0l5.3,5.3,2.3-2.3a1,1,0,0,1,1.4,0l1.3,1.3Zm0,2.82-2-2-2.3,2.3a1,1,0,0,1-1.4,0L9,10.4l-5,5V18H20ZM15,10a1,1,0,1,1,1-1A1,1,0,0,1,15,10Z"
                transform="translate(-2 -4)"
                fill="#fff"
              />
            </svg>
          </label>
        )}
      </div>
      <input
        id="file"
        onChange={handleImageChange}
        type="file"
        accept="image/*"
        style={{
          width: '0.1px',
          height: '0.1px',
          opacity: 0,
          overflow: 'hidden',
          position: 'absolute',
          zIndex: '-1',
        }}
      />

      <div className="flex flex-col md:w-1/2">
        <label
          className="cursor-pointer text-center mb-4 duration-200 text-base px-4 py-2 leading-none rounded border-solid border-2 shadow border-gray-600 bg-white hover:border-green-400 hover:text-green-400 text-gray-600"
          htmlFor="file"
        >
          Choose image
        </label>
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  url: PropTypes.string,
  getImageFile: PropTypes.func.isRequired,
  // setImage: PropTypes.func.isRequired,
};

ImageUpload.defaultProps = {
  url: null,
};

// const mapDispatchToProps = (dispatch) => ({
//   setImage: (image) => dispatch(setImageAction(image)),
// });

export default connect(null, null)(ImageUpload);
