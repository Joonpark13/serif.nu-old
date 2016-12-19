import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  card: {
    marginBottom: '10px'
  }
};

const Cart = ({ sections, components }) => (
    <div>
      {sections.map((section) => (
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
          </CardText>
          <CardActions>
            <FlatButton label="Remove" />
          </CardActions>
        </Card>
      ))}
    </div>
);

export default Cart;

Cart.propTypes = {
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  components: React.PropTypes.arrayOf(React.PropTypes.object)
};
