import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal'
class BestBooks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bookData: [],
      showForm: false,
      bookName:'',
      bookDescription: '',
      bookStatus: '',
      userInfo:this.props.auth0.user,
    };

  }
  componentDidMount = async () => {
    
    
  

    const bookData = await axios.get(`http://localhost:3001/books?email=${this.state.userInfo.email}`);
    

    this.setState({
      bookData: bookData.data.books
    });
    
  }

  handleChange = e => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  showFormFunc =()=> {
    this.setState({
      showForm:true
    })
  }

  handleClose =()=>{
    this.setState({
      showForm:false
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

  const bodyData = {

      userEmail: this.state.userInfo.email,
      bookName: this.state.bookName,
      bookDescription: this.state.bookDescription,
      bookStatus: this.state.bookStatus
       
      
  }

  const newBook = await axios.post(`http://localhost:3001/books`, bodyData)

  this.setState({
    bookData: newBook.data.books
  })
  alert('Your book has been added successfully')
  console.log(this.state.bookData)
  }



  deleteBook = async (index) => {
    const { user } = this.props.auth0;
    const newArrayOfBooks = this.state.bookData.filter((book, i) => {
      return i !== index;
    });

    this.setState({ bookData: newArrayOfBooks });
    console.log(newArrayOfBooks);
    console.log(this.state.userInfo.email.indexOf(index));

    await axios.delete(`http://localhost:3001/books/${index}?email=${this.state.userInfo.email}`)
  }




  
  
  render() {
    return(
      <>
      <Jumbotron>
      <button onClick={this.showFormFunc}>Add a book</button>
      <BookFormModal showModal={this.state.showForm} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <Carousel >
        {this.state.bookData.map((book,i) =>
 <Carousel.Item>

    <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400/111111/111111?text=' '"
                  alt={`slide`}
                />
                 
                   <Carousel.Caption>
                    <Button variant="info" onClick={(e)=>this.deleteBook(i)}>Delete Me</Button>
                   <h3>{book.name}</h3>
       <p>{book.description}</p>
       <p>{book.status}</p>
                   </Carousel.Caption>
  
 </Carousel.Item>
  )}
   </Carousel>
      </Jumbotron>
      </>
    )
  }
}

export default withAuth0(BestBooks );
