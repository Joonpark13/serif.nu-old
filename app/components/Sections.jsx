import React from 'react';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

const Sections = ({ isOpen, selected, sections, courseName, click, close }) => {
  const actions = [
    <FlatButton label="Cancel" primary onTouchTap={close} />
  ];
  return (
    <Dialog
      title={courseName}
      actions={actions}
      modal
      open={isOpen}
      onRequestClose={() => close(selected.school, selected.subject)}
    >
      <List>
        {sections.map((section) => (
          <ListItem
            key={section.id}
            primaryText={section.section}
            onClick={() => click(selected.school, selected.subject, selected.course, section.id)}
          />
        ))}
      </List>
    </Dialog>
  );
}

export default Sections;
