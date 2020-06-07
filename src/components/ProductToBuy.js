import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const Productcard = styled.div`
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.basic};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  padding: 16px 24px;
  max-width: 300px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 252px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  display: block;
  max-height: 100%;
`;

const ImagePlaceholder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  position: absolute;
`;

const FoodIcon = styled(FastfoodIcon)`
  height: 81px;
  width: 81px;
  color: ${({ theme }) => theme.colors.white};
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 16px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding-bottom: 16px;
  margin-bottom: 16px;
  text-align: center;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.colors.lightGray};
`;

const Title = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 8px;
`;

const PantryState = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Key = styled.span`
  width: 55%;
  padding: 16px 0;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-size: ${({ theme, size }) => (size ? theme.fontSizes[size] : theme.fontSizes.s)};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 8px;
`;

const Value = styled.span`
  width: 45%;
  padding: 16px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  letter-spacing: 0.4px;
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.text)};
  font-size: ${({ theme, size }) => (size ? theme.fontSizes[size] : theme.fontSizes.m)};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 8px;
`;

const Summary = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 16px;
  margin-top: 16px;
  border-top-width: 2px;
  border-color: ${({ theme }) => theme.colors.lightGray};
`;

const ProductToBuy = ({ product }) => {
  const { name, img, unit, isMax, isLow, currently } = product;
  const [loaded, setLoaded] = useState(false);
  const onImageLoaded = () => {
    setLoaded(true);
  };
  return (
    <Productcard>
      <ImageWrapper>
        {img && (
          <ProductImage className="animated-img" src={img} alt={name} onLoad={onImageLoaded} />
        )}

        {!loaded && (
          <ImagePlaceholder>
            <FoodIcon />
          </ImagePlaceholder>
        )}
      </ImageWrapper>
      <ProductInfoWrapper>
        <TitleWrapper>
          <Title>{name}</Title>
        </TitleWrapper>
        <PantryState>
          <Key>Maximum in pantry:</Key>
          <Value>{`${isMax} ${unit}`}</Value>
          <Key>Minimum in pantry:</Key>
          <Value>{`${isLow} ${unit}`}</Value>
          <Key>Currently in pantry:</Key>
          <Value>{`${currently} ${unit}`}</Value>
        </PantryState>
        <Summary>
          <Key size="xl">Buy:</Key>
          <Value size="xl" color="primary">
            {`${isMax - currently} ${unit}`}
          </Value>
        </Summary>
      </ProductInfoWrapper>
    </Productcard>
  );
};

ProductToBuy.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default ProductToBuy;
