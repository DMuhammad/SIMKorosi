import PropTypes from "prop-types";

export default function Thead({ title }) {
  return (
    <thead>
      <tr>
        {title.map((text, index) => {
          return (
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
              key={index}
            >
              {text}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

Thead.propTypes = {
  title: PropTypes.array.isRequired,
};
