import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductToBuy from 'components/ProductToBuy';
import { getShoppingList as getShoppingListAction } from 'services/productList/actions';
import Loading from '../components/Loader';
import PageContentWrapper from '../components/page/PageContentWrapper';
import Title from '../components/page/PageTitle';

const InnerWrapper = styled.div`
  display: grid;
  grid-gap: 24px;
  justify-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 16px 0;
  @media ${({ theme }) => theme.breakpoints.md} {
    grid-template-columns: repeat(2, 300px);
  }
  @media ${({ theme }) => theme.breakpoints.lg} {
    grid-template-columns: repeat(3, 300px);
  }
  @media ${({ theme }) => theme.breakpoints.xl} {
    grid-template-columns: repeat(4, 300px);
  }
`;

const EmptyListInfo = styled.div`
  text-align: center;
  margin-top: 64px;
  padding: 20px 48px;
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const ShoppingList = ({ getShoppingList, shoppingList, loading }) => {
  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <PageContentWrapper transparent>
      <Title align="left">Shopping List</Title>
      {loading.shoppingList ? (
        <Loading />
      ) : (
        <InnerWrapper>
          {shoppingList.length ? (
            shoppingList.map((item) => <ProductToBuy key={item.id} product={item} />)
          ) : (
            <EmptyListInfo>
              Nothing to buy,
              <br />
              you have everything!{' '}
              <span role="img" aria-label="finger_up">
                👍
              </span>
            </EmptyListInfo>
          )}
        </InnerWrapper>
      )}
    </PageContentWrapper>
  );
};

ShoppingList.propTypes = {
  getShoppingList: PropTypes.func.isRequired,
  shoppingList: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.shape().isRequired,
};

ShoppingList.defaultProps = {
  shoppingList: [],
};

const mapStateToProps = (state) => {
  const { loading } = state.loading;
  const { shoppingList } = state.products;
  return { shoppingList, loading };
};

const mapDispatchToProps = (dispatch) => ({
  getShoppingList: () => dispatch(getShoppingListAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
