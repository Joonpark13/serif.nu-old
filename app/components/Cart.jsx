import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  card: {
    marginBottom: '10px'
  }
};

const matchId = (id) => (
  (component) => (id === component.id)
);

const Cart = ({ sections, components, remove }) => (
  <div>
    {sections.map((section) => {
      // There should at most be one match
      const component = components.filter(matchId(section.id))[0];
      return (
        <Card key={section.id} style={style.card}>
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
          </CardActions>
        </Card>
      );
    })}
  </div>
);

export default Cart;

Cart.propTypes = {
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  components: React.PropTypes.arrayOf(React.PropTypes.object),
  remove: React.PropTypes.func
};
