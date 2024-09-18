import ProjectItem from "../ProjectItem/ProjectItem.styles";
import PropTypes from "prop-types";

const ProjectsList = ({ className: styles, projects }) => {
  return (
    <ul className={styles}>
      {projects &&
        projects.map((item) => <ProjectItem key={item.id} project={item} />)}
    </ul>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default ProjectsList;
