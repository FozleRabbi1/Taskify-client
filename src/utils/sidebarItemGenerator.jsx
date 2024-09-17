import { NavLink } from "react-router-dom";

export const sidebarItemGenerator = (items, role) => {
  const sideBarItems = items.reduce((acc, item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: (
          <NavLink to={`/${role}/${item.path}`} className="flex items-center gap-2">
            {item.logo && <span className="text-xl">{item.logo}</span>} 
            {item.name}
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: (
          <div className="flex items-center gap-2">
            {item.logo && <span  className="text-xl" >{item.logo}</span>} 
            {item.name}
          </div>
        ),
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`} className="flex items-center gap-2">
                  {child.logo && <span  className="text-xl">{child.logo}</span>} 
                  {child.name}
                </NavLink>
              ),
            };
          }
        }),
      });
    }
    return acc;
  }, []);

  return sideBarItems;
};
