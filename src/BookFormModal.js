import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

 class BookFormModal extends Component {
    render() {
        return (
            <div>
                 <Modal show={this.props.showModal} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group>
        <Form.Control type="text" placeholder="Book Name" name='bookName' onChange={e=>this.props.handleChange(e)} />
        <br />
        <Form.Control type="text" placeholder="Book Description" name="bookDescription" onChange={e=>this.props.handleChange(e)}/>
        <br />
        <Form.Control type="text" placeholder="Book Status" name="bookStatus" onChange={e=>this.props.handleChange(e)} />


          <Button variant="primary" type="submit" onClick={e=> this.props.handleSubmit(e)} >
            Submit
        </Button>
        </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
        )
    }
}

export default BookFormModal
