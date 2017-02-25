import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List } from 'immutable';

import Components from './Components.jsx';

const style = {
  card: {
    marginBottom: '10px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '10px'
  },
  heading: {
    marginTop: 0,
    marginBottom: 0
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
  hours,
  remove,
  swapComponent,
  addComponent,
  addComponentHover,
  removeHover,
  removeAll
}) => (
  <div>
    {!isFetching && swapping && <Components
      sections={sections.toJS()}
      selected={selected}
      details={details}
      addComponent={addComponent}
      addComponentHover={addComponentHover}
      removeHover={removeHover}
    />}

    {!swapping &&
      <div>
        <div style={style.header}>
          <h3 style={style.heading}>{sections.size} classes, {hours} hrs</h3>
          <FlatButton
            primary
            disabled={sections.size === 0}
            label="Remove All"
            onTouchTap={() => removeAll()}
          />
        </div>

        {sections.map(section => {
          const sectionId = section.get('id');
          const component = components.find(comp => comp.get('id') === sectionId);
          return (
            <div key={sectionId}>
              <Card style={style.card}>
                <CardHeader
                  title={section.get('name')}
                  subtitle={`${section.get('subject')} ${section.get('course')} - Section ${section.get('section')}`}
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  <p>{section.getIn(['class_mtg_info', 0, 'meet_t'])}</p>
                  <p>{section.get('location')}</p>
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
    }
  </div>
);

export default Cart;

Cart.propTypes = {
  sections: React.PropTypes.instanceOf(List),
  components: React.PropTypes.instanceOf(List),
  swapping: React.PropTypes.bool,
  hours: React.PropTypes.string,
  remove: React.PropTypes.func,
  swapComponent: React.PropTypes.func,
  addComponent: React.PropTypes.func,
  addComponentHover: React.PropTypes.func,
  removeHover: React.PropTypes.func,
  removeAll: React.PropTypes.func
};
