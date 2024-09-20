import PropTypes from "prop-types";

export default function Input({ name, value, onChange }) {
  return (
    <div className="relative">
      <label
        htmlFor={name.split(" ").join("-")}
        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
      >
        {name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}
      </label>
      <input
        type="date"
        name={name.split(" ").join("_")}
        id={name.split(" ").join("_")}
        className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
