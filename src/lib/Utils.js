const humanize = (input) => {
  const str = input.split(/(?=[A-Z])/).join(" ");
  return str[0].toUpperCase() + str.slice(1);
};

export { humanize };
