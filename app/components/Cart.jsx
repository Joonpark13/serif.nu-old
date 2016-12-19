import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const Cart = ({ sections, components }) => (
    <div>
      {sections.map((section) => (
        <Card key={section.id}>
          <CardHeader
            title={section.name}
            subtitle={`${section.subject} ${section.course}`}
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      ))}
    </div>
);

export default Cart;

Cart.propTypes = {
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  components: React.PropTypes.arrayOf(React.PropTypes.object)
};
