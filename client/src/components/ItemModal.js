import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { addItem } from "../redux/actions/itemActions";

export class ItemModal extends Component {
  state = {
    modal: false,
    item: ""
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { item } = this.state;
    if (item) this.props.addItem(item.toUpperCase());
    this.setState({ item: "" });
    this.toggle();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {isAuthenticated ? (
          <Button color="dark" onClick={this.toggle} className="mb-3">
            Add Item
          </Button>
        ) : (
          <h4 className="ml-1">Please Login to manage Items</h4>
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="item">Enter Item : </Label>
                <Input
                  type="text"
                  name="item"
                  id="item"
                  value={this.state.item}
                  placeholder="..."
                  onChange={this.handleChange}
                  autoComplete="off"
                />
              </FormGroup>
              <Button block color="dark">
                Add
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ item, auth }) => ({
  item,
  auth
});

export default connect(mapStateToProps, { addItem })(ItemModal);
