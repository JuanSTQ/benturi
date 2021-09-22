const moveScroll = (nodes) => {
  const carousel = Array.from(document.getElementsByClassName('carousel'));
  carousel.forEach((node) => {
    const actionDown = () => {
      setout(true);
    };
    const actionMove = (e) => {
      if (out) {
        if (e.movementX > 0) {
          e.currentTarget.scrollLeft -= 10;
        } else {
          e.currentTarget.scrollLeft += 10;
        }
      }
    };
    const actionUp = () => {
      setout(false);
    };
    const actionLeave = () => {
      setout(false);
    };

    node.addEventListener('mousedown', actionDown);
    node.addEventListener('mouseup', actionUp);
    node.addEventListener('mousemove', actionMove);
    node.addEventListener('mouseleave', actionLeave);
  });
};
export default moveScroll;
