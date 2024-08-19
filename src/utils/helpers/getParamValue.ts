export const getParamValue = <T>(
  key: string,
  defaultValue: T,
  searchParams: URLSearchParams
): T => {
  const value = searchParams.get(key);
  if (value === null) return defaultValue;
  if (typeof defaultValue === "boolean") return (value === "true") as T;
  if (typeof defaultValue === "number")
    return (Number(value) || defaultValue) as T;
  return value as T;
};
