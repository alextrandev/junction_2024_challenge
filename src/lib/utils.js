  // Helper function for safe array rendering
  export const safeRender = (array, renderFn) => {
    return Array.isArray(array) ? array.map(renderFn) : null;
  };

  // Safe access to nested objects
  export const safeAccess = (obj, path, defaultValue = "") => {
    return (
      path.split(".").reduce((acc, part) => acc?.[part], obj) ?? defaultValue
    );
  };