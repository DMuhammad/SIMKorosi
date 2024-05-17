import PropTypes from "prop-types";
import SelectMenu from "../../components/SelectMenu";

export default function Filter({ filter, times, locations, handleFilter }) {
  return (
    <div className="overflow-hidden bg-white shadow rounded-lg w-11/12 mx-auto my-10">
      <div className="px-4 py-5 sm:p-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Filter
            </h3>
          </div>
          <div className="ml-4 mt-2">
            <SelectMenu
              initial={filter.period}
              sx="fixed right-40 md:right-44 lg:right-48"
              menus={times}
              onChange={handleFilter}
              section="period"
            />
            <SelectMenu
              initial={filter.location}
              sx="fixed right-14 md:right-[4.5rem] lg:right-[5.5rem]"
              menus={locations}
              onChange={handleFilter}
              section="location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.object.isRequired,
  times: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
