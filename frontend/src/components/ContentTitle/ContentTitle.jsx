import PropTypes from "prop-types";

const ContentTitle = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-xl font-bold tracking-wide mb-1">{title}</h1>
      <p className="text-sm text-zinc-500 w-1/2">{description}</p>
    </div>
  );
};

ContentTitle.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default ContentTitle;
