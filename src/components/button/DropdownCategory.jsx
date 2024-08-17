import React, { useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { fetchCategoryTypes, fetchCategories, selectCategoryTypes, selectCategories } from "../../redux/feature/category/cateSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function DropdownCategory() {
  const dispatch = useDispatch();
  const categoryTypes = useSelector(selectCategoryTypes);
  const categories = useSelector(selectCategories);
  const navigate = useNavigate(); // Initialize useNavigate
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCategoryTypes());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    navigate(`/service?category=${category.category_name}`);
  };

  return (
    <div className="h-[70px] w-full bg-[#022278] flex justify-evenly items-center font-simple text-white text-lg mt-10 max-md:flex-wrap">
      {categoryTypes.map((type) => (
        <Menu key={type.id} as="div" className="relative inline-block text-left mb-4 md:mb-0">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-[16px] font-semibold text-white">
              {type.name}
              <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white" />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 w-[150px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              {categories
                .filter(category => category.category_type === type.id)
                .map(category => (
                  <MenuItem key={category.id}>
                    <a
                      href="#"
                      onClick={() => handleCategoryClick(category)} // Handle category click
                      className="block px-5 py-2 text-sm text-gray-700 data-[focus]:bg-Primary data-[focus]:text-white"
                    >
                      {category.category_name}
                    </a>
                  </MenuItem>
                ))}
            </div>
          </MenuItems>
        </Menu>
      ))}
    </div>
  );
}
