import React from 'react';

import { Carousel } from 'react-responsive-carousel';

function CustomCarousel({
  showStatus, showThumbs, onLast, children,
}) {
  const customRenderArrowNext = (clickHandler, hasNext, label) => {
    if (!hasNext) {
      onLast();
    }

    const defaultFn = Carousel.defaultProps.renderArrowNext;
    return defaultFn(clickHandler, hasNext, label);
  };

  return (
    <Carousel
      showStatus={showStatus}
      showThumbs={showThumbs}
      renderArrowNext={customRenderArrowNext}
    >
      {children}
    </Carousel>
  );
}

export default React.memo(CustomCarousel);
