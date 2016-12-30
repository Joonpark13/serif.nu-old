import React from 'react';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

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
  }
};

const Components = ({
  sections,
  selected,
  details,
  addComponent,
  addComponentHover,
  removeHover
}) => {
  let sectionTitle = '';
  sections.forEach((section) => {
    if (section.id === selected.section) {
      sectionTitle = section.name;
    }
  });
  return (
    <div>
      <h3 style={style.headings}>Choose a component:</h3>

      <List>
        {details.associated_classes.map((comp, index) => {
          const formattedComp = {
            id: selected.section,
            title: `${sectionTitle} ${comp.component}`,
            ...comp
          };
          return (
            <ListItem
              key={index}
              primaryText={<h4 style={style.title}>{comp.component}</h4>}
              secondaryText={comp.meeting_time}
              onMouseEnter={() => addComponentHover(formattedComp)}
              onMouseLeave={() => removeHover(comp.id)}
              onTouchTap={() => {
                addComponent(formattedComp);
                removeHover(comp.id);
              }}
            />
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
  details: React.PropTypes.shape({
    _id: React.PropTypes.string,
    qtr: React.PropTypes.string,
    lmod: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    topic: React.PropTypes.string,
    class_mtg_info: React.PropTypes.array,
    descriptions: React.PropTypes.array,
    enrl_requirement: React.PropTypes.string,
    class_attributes: React.PropTypes.string,
    associated_classes: React.PropTypes.array,
    school: React.PropTypes.string,
    subject: React.PropTypes.string,
    course: React.PropTypes.string,
    section: React.PropTypes.string
  }),
  addComponent: React.PropTypes.func
};

export default Components;
