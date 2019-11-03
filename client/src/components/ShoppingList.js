import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export class ShoppingList extends Component {
  state = {
    items: [
      {
        id: 1,
        name: 'Eggs',
      },
      {
        id: 2,
        name: 'Milk',
      },
      {
        id: 3,
        name: 'Bread',
      },
    ],
  };

  render = () => {
    const { items } = this.state;

    return (
      <Container className='shopping-list'>
        <Button color='dark' className='mb-3'>
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className='shopping-list-group'>
            {items.map(({ name, id }) => (
              <CSSTransition key={id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button className='remove-btn mr-3' color='danger' size='sm'>
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  };
}

export default ShoppingList;
