type Props = {
  image: string
}
function CustomImage({image}:Props) {
  return (
    <div className="App">
        <img src={image} className="image" alt="logo" />
    </div>
  );
}

export default CustomImage;
