import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  @media ${({ theme }) => theme.breakpoints.md} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Label = styled.span`
  display: block;
  text-transform: uppercase;
  line-height: 20px;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 8px;
  @media ${({ theme }) => theme.breakpoints.md} {
    width: 100%;
  }
`;

const Message = styled.span`
  padding: 8px 24px;
  display: block;
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.basic};
  font-size: ${({ theme }) => theme.fontSizes.s};
  margin-bottom: 24px;
  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.fontSizes.m};
    width: 100%;
  }
  ${({ isWarning }) =>
    isWarning
      ? css`
          background-color: ${({ theme }) => theme.colors.lightDiscard};
          color: ${({ theme }) => theme.colors.discard};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.lightAccept};
          color: ${({ theme }) => theme.colors.accept};
        `}
`;

const InnerWrapper = styled.div`
  width: 100%;
  padding-right: 24px;
  @media ${({ theme }) => theme.breakpoints.md} {
    width: 50%;
  }
`;

const ImagePreview = styled.img`
  border-radius: 4px;
  display: block;
  margin-bottom: 24px;
  box-shadow: ${({ theme }) => theme.shadows.basic};
  max-height: 300px;
  max-width: 100%;
`;

const PlaceholderPreview = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 128px;
  width: 128px;
  border-radius: 4px;
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
`;

const FoodIcon = styled(FastfoodIcon)`
  height: 64px;
  width: 64px;
  color: ${({ theme }) => theme.colors.white};
`;

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.breakpoints.md} {
    width: 50%;
  }
`;

const ChooseImgBtn = styled.label`
  cursor: pointer;
  text-align: center;
  transition: 0.2s;
  padding: 8px;
  line-height: 16px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.m};
  box-shadow: ${({ theme }) => theme.shadows.basic};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    border-color: ${({ theme }) => theme.colors.darkGray};
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

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
    <LoaderWrapper>
      <Label>Product image</Label>
      {message.isMessage && <Message isWarning={message.isWarning}>{message.messageText}</Message>}
      <InnerWrapper>
        {preview && <ImagePreview className="animated-img" src={preview} alt="product_image" />}
        {!preview && (
          <PlaceholderPreview htmlFor="file" className="animated-img">
            <FoodIcon />
          </PlaceholderPreview>
        )}
      </InnerWrapper>
      <FileInput id="file" onChange={handleImageChange} type="file" accept="image/*" />

      <ButtonWrapper>
        <ChooseImgBtn htmlFor="file">Choose image</ChooseImgBtn>
      </ButtonWrapper>
    </LoaderWrapper>
  );
};

ImageUpload.propTypes = {
  url: PropTypes.string,
  getImageFile: PropTypes.func.isRequired,
};

ImageUpload.defaultProps = {
  url: null,
};

export default ImageUpload;
