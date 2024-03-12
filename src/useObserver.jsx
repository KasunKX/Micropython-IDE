import react, { useState, useEffect } from "react";

const useObserver = (object, newClass) => {
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    setCurrent(true);

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((itm) => {
        if (itm.isIntersecting) {
          object.classList.add(newClass);
        }
      });
    });

    {
      current ? observer.observe(object) : console.log("ughhh...");
    }
  });

  return { current };
};

export default useObserver;