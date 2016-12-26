import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
    {!swapping && sections.map((section) => {
      // There should at most be one match
      const component = components.filter(matchId(section.id))[0];
      return (
        <div key={section.id}>
          <Card style={style.card}>
            <CardHeader
              title={section.name}
              subtitle={`${section.subject} ${section.course}`}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <p>{section.meeting_time}</p>
              <p>{section.instructor.join(', ')}</p>
              {section.topic && <p>{section.topic}</p>}
              <p>{section.overview_of_class}</p>
              <p>ID: {section.id}</p>
              {component && (
                <div>
                  <h4>{component.component}</h4>
                  <p>{component.meeting_time}</p>
                  <p>{component.room}</p>
                </div>
              )}
            </CardText>
            <CardActions>
              <FlatButton label="Remove" primary onTouchTap={() => remove(section.id)} />
              {component && (
                <FlatButton
                  label="Swap Component"
                  primary
                  onTouchTap={() => swapComponent(currentTerm, section.school, section.subject, section.course, section.id)}
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
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  components: React.PropTypes.arrayOf(React.PropTypes.object),
  swapping: React.PropTypes.bool,
  remove: React.PropTypes.func,
  swapComponent: React.PropTypes.func
};
