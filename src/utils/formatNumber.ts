export const formatWithCommas = (value: string): string => {
  const num = parseFloat(value);
  return isNaN(num) ? "" : num.toLocaleString("en-US");
};

export const parseNumericInput = (value: string, allowDecimal = false): string => {
  const stripped = value.replace(/,/g, "");
  return allowDecimal
    ? stripped.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1")
    : stripped.replace(/[^\d]/g, "");
};
