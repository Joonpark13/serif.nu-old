import React from 'react';
import { List, ListItem } from 'material-ui/List';

const style = {
  headings: {
    marginTop: 0,
    marginBottom: '5px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  divider: {
    marginTop: '5px',
    marginBottom: '10px'
  },
  loading: {
    display: 'block',
    margin: 'auto'
  },
  title: {
    marginTop: 0
  },
  bodyText: {
    fontSize: 'small'
  }
};

const Components = ({
  selected,
  sections,
  addComponent,
  addComponentHover,
  removeHover
}) => {
  let selectedSection = '';
  sections.forEach((section) => {
    if (section.id === selected.section) {
      selectedSection = section;
    }
  });
  return (
    <div>
      <h3 style={style.headings}>Choose a component:</h3>

      <List>
        {selectedSection && selectedSection.associated_classes.map((comp, index) => {
          const formattedComp = {
            id: selected.section,
            title: `${selectedSection.name} ${comp.component}`,
            ...comp
          };
          return (
            <ListItem
              key={index}
              onMouseEnter={() => addComponentHover(formattedComp)}
              onMouseLeave={() => removeHover()}
              onTouchTap={() => {
                addComponent(formattedComp);
                removeHover();
              }}
            >
              <h4 style={style.title}>{comp.component}</h4>
              <p style={style.bodyText}>{comp.meeting_time}</p>
              <p style={style.bodyText}>{comp.room}</p>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

Components.propTypes = {
  sections: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selected: React.PropTypes.shape({
    school: React.PropTypes.string,
    subject: React.PropTypes.string,
    course: React.PropTypes.string,
    section: React.PropTypes.string
  }).isRequired,
  addComponent: React.PropTypes.func,
  addComponentHover: React.PropTypes.func,
  removeHover: React.PropTypes.func
};

export default Components;
