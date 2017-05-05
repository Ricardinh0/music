const loadFileAndDecode = (context) => {
  const {
    src
  } = context;
  return fetch(src)
    .then(res => res.arrayBuffer())
    .then(arrayBuffer => Promise.resolve(arrayBuffer))
    .catch(err => Promise.reject(err));
};

export default loadFileAndDecode;
