export const getDataUri = (file) => {
  const fileUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  return {
    content: fileUri,
  };
};
