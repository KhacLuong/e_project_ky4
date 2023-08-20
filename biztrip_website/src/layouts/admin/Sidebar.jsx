import React from 'react';
import {dataSidebarAdmin} from "../../utils/data.jsx";
import ElementSidebar from "../../components/admin/ElementSidebar.jsx";

const Sidebar = () => {
    return (
        <div className={`flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50`}>
            <div className={`flex overflow-y-auto flex-col flex-1 pt-2 pb-4`}>
                <div className={`flex-1 px-3 bg-gray-50`} id={`sidebar-items`}>
                    <ul className={`pb-2 pt-1`}>
                        {
                            dataSidebarAdmin.map((item, index) => {
                                const Icon = item.icon
                                if (item.isSubcategory) {
                                    return (
                                        <li key={`sidebar-item-${index}`} className={`py-2`}>
                                            <ElementSidebar item={item} Icon={Icon} path={`/admin/v1/cms`}/>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={`sidebar-item-${index}`} className="w-full mt-4 mb-3">
                                            <h6 className="pl-4 font-bold leading-tight uppercase text-xs opacity-60">{item.name}</h6>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;