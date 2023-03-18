import { useEffect, useState } from 'react';

// set title for component
function useTitle(title = 'Tieng Hàn Thầy Tư', isOverride = false) {
  useEffect(() => {
    if (isOverride) {
      document.title = title;
    } else {
      document.title = title !== 'Tieng Hàn Thầy Tư' ? `${title} - Tieng Hàn Thầy Tư` : title;
    }
  }, []);

  return null;
}

export default useTitle;
