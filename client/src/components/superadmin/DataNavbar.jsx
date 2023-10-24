const DataNavbar = () => {
  return (
    <ul className="flex gap-12">
      <li>
        <a href="">
          <button className="bg-gray-900 text-white px-6 py-1.5 rounded-md">
            Schools
          </button>
        </a>
      </li>
      <li>
        <a href="">
          <button className="bg-gray-900 text-white px-6 py-1.5 rounded-md">
            Admins
          </button>
        </a>
      </li>
      <li>
        <a href="">
          <button className="bg-gray-900 text-white px-6 py-1.5 rounded-md">
            Students
          </button>
        </a>
      </li>
    </ul>
  );
};

export default DataNavbar;
