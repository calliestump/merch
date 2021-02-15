import React from "react";
import ProductList from "./ProductList";
import NewProductForm from "./NewProductForm";
import ProductDetails from "./ProductDetails";
import EditProductForm from './EditProductForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class ProductControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      formVisibleOnPage: false,
      createNewProduct: false,
      selectedProduct: null,
      editing: false
    };
  }


  //Create
  handleAddingNewProductToList = (newProduct) => {
    const { dispatch } = this.props;
    const { id, name, location, quantity } = newProduct;
    const action = {
      type: 'ADD_PRODUCT',
      id: id,
      name: name,
      location: location,
      quantity: quantity
    }
    dispatch(action);
    this.setState({ formVisibleOnPage: false });
  }

  //Details
  handleChangingSelectedProduct = (id) => {
    const selectedProduct = this.props.masterProductList[id];
    this.setState({ selectedProduct: selectedProduct });
  }

  showFormOnClick = () => {
    if (this.state.selectedProduct != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedProduct: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  //Edit
  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleEditingProductInList = (productToEdit) => {
    const { dispatch } = this.props;
    const { id, name, location, quantity } = productToEdit;
    const action = {
      type: 'ADD_PRODUCT',
      id: id,
      name: name,
      location: location,
      quantity: quantity,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedProduct: null
    });
  }

  handleBuyClick = (id) => {
    const productToBuy = this.state.masterProductList.filter(
      product => product.id === this.state.selectedProduct.id)[0];
    if (productToBuy.quantity !== 0) {
      productToBuy.quantity--;
    }
    const editedProductList = this.state.masterProductList
      .filter(product => product.id !== id);
    this.setState({
      masterProductList: editedProductList,
      editing: false,
      selectedProduct: null
    });
  }

  handleRestockClick = (id) => {
    const productToRestock = this.state.masterProductList.filter(
      product => product.id === this.state.selectedProduct.id)[0];
    if (productToRestock.quantity !== 0) {
      productToRestock.quantity++;
    }
    const editedRestockProductList = this.state.masterProductList
      .filter(product => product.id !== id);
    this.setState({
      masterProductList: editedRestockProductList,
      editing: false,
      selectedProduct: null
    });
  }

  //Delete
  handleDeletingProduct = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_PRODUCT',
      id: id
    }
    dispatch(action);
    this.setState({ selectedProduct: null });
  }

  render() {
    let buttonText = null;
    let currentlyVisibleState = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditProductForm product={
        this.state.selectedProduct} onEditProduct={
          this.handleEditingProductInList
        } />
      buttonText = "Product List";
    }
    else if (this.state.selectedProduct != null) {
      currentlyVisibleState =
        <ProductDetails
          product={this.state.selectedProduct}
          onClickingDelete={this.handleDeletingProduct}
          onClickingRestock={this.handleRestockClick}
          onClickingBuy={this.handleBuyClick}
          onClickingUpdate={this.handleEditClick} />;
      buttonText = "Product List";
    }
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewProductForm onNewProductCreation={this.handleAddingNewProductToList} />;
      buttonText = "Product List";
    }
    else {
      currentlyVisibleState = <ProductList productList={this.props.masterProductList} onProductSelection={this.handleChangingSelectedProduct} />;
      buttonText = "Add Product";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.showFormOnClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

ProductControl.propTypes = {
  masterProductList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterProductList: state
  }
}

ProductControl = connect(mapStateToProps)(ProductControl);
export default ProductControl;





