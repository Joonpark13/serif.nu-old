import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List } from 'immutable';

import Components from './Components.jsx';
import { matchId } from '../helpers';

const style = {
  card: {
    marginBottom: '10px'
  }
};

const Cart = ({
  currentTerm,
  isFetching,
  selected,
  sections,
  components,
  details,
  swapping,
  remove,
  swapComponent,
  addComponent,
  addComponentHover,
  removeHover
}) => (
  <div>
    {sections.length === 0 && <h3>Cart is empty</h3>}
    {!isFetching && swapping && <Components
      sections={sections}
      selected={selected}
      details={details}
      addComponent={addComponent}
      addComponentHover={addComponentHover}
      removeHover={removeHover}
    />}
    {!swapping && sections.map(section => {
      const sectionId = section.get('id');
      const component = components.find(comp => comp.get('id') === sectionId);
      return (
        <div key={sectionId}>
          <Card style={style.card}>
            <CardHeader
              title={section.get('name')}
              subtitle={`${section.get('subject')} ${section.get('course')}`}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <p>{section.get('meeting_time')}</p>
              <p>{section.get('instructor').toJS().join(', ')}</p>
              {section.get('topic') && <p>{section.get('topic')}</p>}
              <p>{section.get('overview_of_class')}</p>
              <p>ID: {sectionId}</p>
              {component && (
                <div>
                  <h4>{component.get('component')}</h4>
                  <p>{component.get('meeting_time')}</p>
                  <p>{component.get('room')}</p>
                </div>
              )}
            </CardText>
            <CardActions>
              <FlatButton label="Remove" primary onTouchTap={() => remove(sectionId)} />
              {component && (
                <FlatButton
                  label="Swap Component"
                  primary
                  onTouchTap={() => swapComponent(
                    currentTerm,
                    section.get('school'),
                    section.get('subject'),
                    section.get('course'),
                    sectionId
                  )}
                />
              )}
            </CardActions>
          </Card>
        </div>
      );
    })}
  </div>
);

export default Cart;

Cart.propTypes = {
  sections: React.PropTypes.instanceOf(List),
  components: React.PropTypes.instanceOf(List),
  swapping: React.PropTypes.bool,
  remove: React.PropTypes.func,
  swapComponent: React.PropTypes.func
};
