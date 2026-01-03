import { useForm } from "@inertiajs/react";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

export default function Search({ url, placeholder }) {
    // define use form inertia
    const { data, setData, get } = useForm({
        search: "",
    });

    // define method searchData
    const handleSearchData = (e) => {
        e.preventDefault();

        get(`${url}?search=${data.search}`);
    };

  return (
    <form onSubmit={handleSearchData}>
        <div className="relative">
            <input
                type="text"
                value={data.search}
                onChange={(e) => setData("search", e.target.value)}
                className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg pr-11 focus:outline-hidden focus:ring-0 focus:ring-gray-400 focus:border-gray-200"
                placeholder={placeholder}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <IconSearch size={18} strokeWidth={1.5} />
            </div>
        </div>
    </form>
  );
}
