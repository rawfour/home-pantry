import React from 'react';
import { useParams } from 'react-router-dom';
import EditForm from '../components/EditForm';

const EditProduct = () => {
  const { id } = useParams();

  return <EditForm id={id} />;
};

export default EditProduct;
