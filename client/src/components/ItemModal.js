import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { addItem } from '../redux/actions/itemActions';

export class ItemModal extends Component {
  state = {
    modal: false,
    item: '',
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = e => {
    const { item } = this.state;
    e.preventDefault();
    if (item) this.props.addItem(item.toUpperCase());
    this.toggle();
  };

  handleChange = e => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Button color='dark' onClick={this.toggle} className='mb-3'>
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for='item'>Enter Item : </Label>
                <Input
                  type='text'
                  name='item'
                  id='item'
                  value={this.state.item}
                  placeholder='...'
                  onChange={this.handleChange}
                  autoComplete='off'
                />
              </FormGroup>
              <Button block color='dark'>
                Add
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
