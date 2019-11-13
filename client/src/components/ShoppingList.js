import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../redux/actions/itemActions";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "./Spinner";
import Skeleton from "./Skeleton";

export class ShoppingList extends Component {
  componentDidMount = () => {
    this.props.getItems();
  };

  handdleDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render = () => {
    const { items, loading, isAuthenticated } = this.props;

    return (
      <div className="shopping-list">
        {loading && (
          <div>
            <Spinner />
            <Skeleton />
          </div>
        )}
        <ListGroup>
          <TransitionGroup className="shopping-list-group">
            {items.map(({ name, _id }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {isAuthenticated && (
                    <Button
                      className="remove-btn mr-3"
                      color="danger"
                      size="sm"
                      onClick={this.handdleDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  )}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </div>
    );
  };
}

const mapStateToProps = ({ item, auth }) => ({
  items: item.items,
  loading: item.loading,
  isAuthenticated: auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
