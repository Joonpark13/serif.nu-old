import React from 'react';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

const Sections = ({ selected, sections, courseName, close }) => {
  const actions = [
    <FlatButton label="Cancel" primary={true} onTouchTap={close} />
  ];
  return (
    <Dialog
      title={courseName}
      actions={actions}
      modal={false} // Allow users to close by pressing esc or anywhere else on the page
      open={selected}
      onRequestClose={close}
    >
      <List>
        {sections.map((section) => (
          <ListItem key={section.id} primaryText={section.section} />
        ))}
      </List>
    </Dialog>
  );
}

export default Sections;
