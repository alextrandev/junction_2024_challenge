// You can change this key, but keep it secret and consistent
const ENCRYPTION_KEY = "ThriveConnect2024";

const encodeCompanyId = (companyId) => {
  // Make the encoding more straightforward
  const encoded =
    (Number(companyId) * 1000 + (Date.now() % 1000)) ^
    parseInt(ENCRYPTION_KEY, 36);
  return encoded.toString(36);
};

const decodeCompanyId = (encoded) => {
  try {
    const decoded = parseInt(encoded, 36) ^ parseInt(ENCRYPTION_KEY, 36);
    return Math.floor(decoded / 1000); // Remove the timestamp and get original companyId
  } catch {
    return null;
  }
};

export const generateHash = (companyId = 1) => {
  const encodedCompany = encodeCompanyId(companyId);
  const randomPart = Math.random().toString(36).substring(2, 8);
  const hashcode = `${encodedCompany}-${randomPart}`;
  return hashcode;
};

export const extractCompanyId = (hash) => {
  try {
    const [encodedPart] = hash.split("-");
    return decodeCompanyId(encodedPart);
  } catch {
    return null;
  }
};

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