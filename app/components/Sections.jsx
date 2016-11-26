import React from 'react';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

const Sections = (
  {
    isOpen,
    selected,
    sections,
    details,
    courseName,
    checkComponents,
    addCourse,
    addComponent,
    close
  }
) => {
  const actions = [
    <FlatButton label="Cancel" primary onTouchTap={close} />
  ];
  let list;
  if (selected.hasComponents) {
    const detail = details[0];
    list = (
      <List>
        {detail.associated_classes.map((component) => (
          <ListItem
            key={component.meeting_time}
            primaryText={component.meeting_time}
            onClick={() => addComponent(detail)}
          />
        ))}
      </List>
    );
  } else {
    list = (
      <List>
        {sections.map((section) => (
          <ListItem
            key={section.id}
            primaryText={section.section}
            onClick={() => {
              checkComponents(selected.school, selected.subject, selected.course, section.id);
              addCourse(section);
            }}
          />
        ))}
      </List>
    );
  }
  return (
    <Dialog
      title={courseName}
      actions={actions}
      modal
      open={isOpen}
      onRequestClose={() => close()}
    >
      {list}
    </Dialog>
  );
}

export default Sections;
