
const htmlRoot = document.querySelector(':root');


// optimize images
export const cloudinaryImgOptimize = (
  originSrc = '',
  width = 0,
  height = 0,
  fAuto = true,
  qAuto = true,
  others = '',
) => {
  if (!originSrc) return '';

  const cloudinaryBaseURL = 'https://res.cloudinary.com/dynonary/image/upload';
  const index = originSrc.indexOf(cloudinaryBaseURL);

  // Not cloudinary source
  if (index === -1) {
    return originSrc;
  }

  let optimize = `${width > 0 ? `w_${width},` : ''}${
    height > 0 ? `h_${height},` : ''
  }${fAuto ? 'f_auto,' : ''}${qAuto ? 'q_auto,' : ''}${
    others && others !== '' ? others : ''
  }`;

  if (optimize[optimize.length - 1] === ',')
    optimize = optimize.slice(0, optimize.length - 1);

  return originSrc.replace(
    cloudinaryBaseURL,
    `${cloudinaryBaseURL}/${optimize}`,
  );
};

