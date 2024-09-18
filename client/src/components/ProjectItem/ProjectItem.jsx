import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import icons from "../../assets/icons/icons.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import PropTypes from "prop-types";

const ProjectItem = ({ className: styles, project }) => {
  const { theme } = useAuth();

  const location = useLocation();
  const isActive = location.pathname.endsWith(`/${project.id}`);

  return (
    <li className={styles}>
      <NavLink
        to={`${project.id}`}
        className={theme}
        data-secondary-action="close burger menu"
      >
        <svg>
          <use href={`${icons}#${project.icon}`}></use>
        </svg>
        <span title={project.name}>{project.name}</span>
      </NavLink>

      {isActive && (
        // todo: => modalele de edit si sters
        <div className={`action-icons ${theme}`}>
          <svg data-secondary-action="close burger menu" className={theme}>
            <use href={`${icons}#icon-pencil`}></use>
          </svg>

          <UseAnimations
            animation={trash2}
            size={21}
            strokeColor="currentColor"
            data-secondary-action="close burger menu"
            className={theme}
          />
        </div>
      )}
    </li>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectItem;
