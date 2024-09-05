
export const routeGenerator = (items) => {
  const adminRoutes = items.reduce((acc, item) => {
    if (item.element && item.path) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.name && item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);
  return adminRoutes;
};
