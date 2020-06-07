import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ProductWrapper = styled.li`
  display: flex;
  margin-bottom: 16px;
  padding: 20px 48px;
  background-color: ${({ theme }) => theme.colors.white};
  height: 128px;
  border-radius: 4px;
`;

const ProductImage = styled.img`
  border-radius: 4px;
  display: block;
  max-height: 100px;
`;

const ImagePlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
  width: 96px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  position: absolute;
`;

const FoodIcon = styled(FastfoodIcon)`
  height: 42px;
  width: 42px;
  color: ${({ theme }) => theme.colors.white};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  width: calc(100% / 6);
  ${({ image }) =>
    image &&
    css`
      position: relative;
      padding: 0 8px 0 0;
    `};
  ${({ actions }) =>
    actions &&
    css`
      padding: 0 0 0 8px;
      justify-content: flex-end;
      grid-gap: 16px;
    `}
`;

const EditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.accept};
  box-shadow: ${({ theme }) => theme.shadows.basic};
  background-color: ${({ theme }) => theme.colors.lightAccept};
  color: ${({ theme }) => theme.colors.accept};
  border-radius: 100%;
  height: 35px;
  width: 35px;
  transition: 0.1s;
  transform: scale(1);
  &:hover {
    transform: scale(1.1);
  }
`;

const PenIcon = styled(EditIcon)`
  height: 24px;
  width: 24px;
`;

const TrashButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.discard};
  box-shadow: ${({ theme }) => theme.shadows.basic};
  background-color: ${({ theme }) => theme.colors.lightDiscard};
  color: ${({ theme }) => theme.colors.discard};
  border-radius: 100%;
  height: 35px;
  width: 35px;
  transition: 0.1s;
  transform: scale(1);
  &:hover {
    transform: scale(1.1);
  }
`;

const TrashIcon = styled(DeleteIcon)`
  height: 24px;
  width: 24px;
`;

const ProductInfo = styled.span`
  font-size: ${({ theme, big }) => (big ? theme.fontSizes.l : theme.fontSizes.m)};
  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme, big }) => (big ? theme.fontSizes.xl : theme.fontSizes.l)};
  }
`;

const ContentInnerWrapper = styled.div`
  width: 100%;
`;

const Product = ({ product, onOpen }) => {
  const { id, name, img, unit, isMax, isLow, currently } = product;
  const [loaded, setLoaded] = useState(false);
  const onImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <ProductWrapper>
      <ContentWrapper image>
        {img && <ProductImage src={img} alt={name} onLoad={onImageLoaded} />}

        {!loaded && (
          <ImagePlaceholder className="animated-img">
            <FoodIcon />
          </ImagePlaceholder>
        )}
      </ContentWrapper>

      <ContentWrapper>
        <ProductInfo big>{name}</ProductInfo>
      </ContentWrapper>

      <ContentWrapper>
        <ProductInfo>{currently}</ProductInfo>
      </ContentWrapper>

      <ContentWrapper>
        <ProductInfo>{unit}</ProductInfo>
      </ContentWrapper>

      <ContentWrapper>
        <ContentInnerWrapper>
          <ProgressBar isMax={isMax} isLow={isLow} currently={currently} />
        </ContentInnerWrapper>
      </ContentWrapper>
      <ContentWrapper actions>
        <Link to={`/product/${id}/edit`}>
          <EditButton>
            <PenIcon />
          </EditButton>
        </Link>
        {onOpen && (
          <TrashButton onClick={() => onOpen(id)} type="button">
            <TrashIcon />
          </TrashButton>
        )}
      </ContentWrapper>
    </ProductWrapper>
  );
};

Product.propTypes = {
  product: PropTypes.shape().isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default Product;
