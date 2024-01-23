import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker'; // Make sure to import the jQuery UI datepicker

function ReactDatePickers() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize the datepicker when the component mounts
    $(inputRef.current).datepicker({
      dateFormat: "dd-mm-yy",
      duration: "fast",
    });

    // Clean up the datepicker when the component unmounts
    return () => {
      $(inputRef.current).datepicker('destroy');
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="wrapper">
      
        <input
          type="text"
          id="datepicker"
          autoComplete="off"
          ref={inputRef}
        />
      
    </div>
  );
}

export default ReactDatePickers;


