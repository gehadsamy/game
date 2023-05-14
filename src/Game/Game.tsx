import { useRef, useState, useEffect } from "preact/hooks";


const Game = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [positionIndex, setPositionIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const positions = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
  ];

  useEffect(() => {
    const image = imageRef.current;
    if (image) {
      const position = positions[positionIndex];
      const animationDuration = 1000;
      image.style.transition = `transform ${animationDuration}ms linear`;
      image.style.transform = `translate(${position.x}px, ${position.y}px)`;

      const popupTimer = setTimeout(() => {
        setShowPopup(true);
      }, animationDuration);

      return () => clearTimeout(popupTimer);
    }
  }, [positionIndex, positions]);

  const handlePopupClose = () => {
    setShowPopup(false);
    setPositionIndex((positionIndex) => (positionIndex + 1) % positions.length);
  };

  let popupContent;
  switch (positionIndex) {
    case 0:
      popupContent = (
        <div>
          <h1>Position 1</h1>
          <p>This is the first position.</p>
        </div>
      );
      break;
    case 1:
      popupContent = (
        <div>
          <h1>Position 2</h1>
          <p>This is the second position.</p>
        </div>
      );
      break;
    case 2:
      popupContent = (
        <div>
          <h1>Position 3</h1>
          <p>This is the third position.</p>
        </div>
      );
      break;
    case 3:
      popupContent = (
        <div>
          <h1>Position 4</h1>
          <p>This is the fourth position.</p>
        </div>
      );
      break;
    default:
      popupContent = null;
      break;
  }

  return (
    <div>
      <img
        ref={imageRef}
        src="https://via.placeholder.com/100"
        alt="moving image"
      />
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 50,
            backgroundColor: "white",
            padding: 20,
            border: "1px solid black",
          }}
        >
          {popupContent}
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Game;
