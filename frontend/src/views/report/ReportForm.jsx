import PropTypes from "prop-types";
import Input from "../../components/Input";

export default function ReportForm({ value, onChange, onClick }) {
  return (
    <div className="overflow-hidden bg-white shadow rounded-lg w-11/12 mx-auto my-10">
      <div className="px-4 py-5 sm:p-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="flex flex-wrap">
            <div className="ml-4 mt-2">
              <Input
                name="min date"
                value={value.min_date}
                onChange={onChange}
              />
            </div>
            <div className="ml-4 mt-2">
              <Input
                name="max date"
                value={value.max_date}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={onClick}
            >
              Create Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReportForm.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
