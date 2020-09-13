import React from 'react';
import { Link } from 'react-router-dom';
import {storage} from '../firebase/config';


class Product extends React.Component {

  constructor() {
    super();
    this.state = {
      imageUrl: ''
    }
  }

  componentDidMount(){
      let storageRef = storage.ref();
    storageRef
      .child(`${this.props.data.imageName}`)
      .getDownloadURL()
      .then(url => {
        this.setState({
          imageUrl: url,
        })
      })
      .catch(err=>{
        console.error(err);
      })
  }

  render() {
    return (
      <div className='product-container'>
        <Link to={`/product/${this.props.data.id}`} >
          <img className='product-img' src={this.state.imageUrl} alt='product' />
          <h5 className='product-name'>{this.props.data.name}</h5>
        </Link>
        <p className='product-price'>{this.props.data.price}</p>
      </div>
    );
  }
}

export default Product;