export const ColorSetVar = async (color) => {
  let setRGBA = "rgba(";
  setRGBA += color.r + ", ";
  setRGBA += color.g + ", ";
  setRGBA += color.b + ", ";
  setRGBA += color.a + ")";
  return await setRGBA;
};