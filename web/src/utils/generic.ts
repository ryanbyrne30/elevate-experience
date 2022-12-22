export const getDomain = () => {
  const { protocol, hostname, port } = window.location;
  if (port.length > 0) return `${protocol}://${hostname}:${port}`;
  return `${protocol}://${hostname}`;
};
