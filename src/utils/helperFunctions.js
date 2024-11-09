// You can change this key, but keep it secret and consistent
const ENCRYPTION_KEY = "ThriveConnect2024";

const encodeCompanyId = (companyId) => {
  // Convert companyId to number and add some randomness
  const timestamp = Date.now() % 10000; // Last 4 digits of timestamp
  const encoded =
    (Number(companyId) * 97 + timestamp) ^ parseInt(ENCRYPTION_KEY, 36);
  return encoded.toString(36); // Convert to base36 for shorter string
};

const decodeCompanyId = (encoded) => {
  try {
    // Reverse the encoding process
    const decoded = parseInt(encoded, 36) ^ parseInt(ENCRYPTION_KEY, 36);
    return Math.floor(decoded / 97); // Remove the timestamp influence
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
