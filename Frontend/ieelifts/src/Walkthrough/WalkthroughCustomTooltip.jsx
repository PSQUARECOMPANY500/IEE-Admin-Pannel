import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

function WalkthroughCustomTooltip({
  backProps,
  continuous,
  index,
  primaryProps,
  skipProps,
  step,
  tooltipProps,
}) {
  const navigate = useNavigate();
  const [showPrimaryButton, setShowPrimaryButton] = useState(!step.content2);

  // Handle navigation and call primary action
  const handleNext = useCallback(() => {
    if (step.isNavigate && step.navigateTo) {
      navigate(step.navigateTo);
      setTimeout(() => {
        primaryProps.onClick({ preventDefault: () => {} });
      }, 100);
    } else {
      primaryProps.onClick({ preventDefault: () => {} });
    }
  }, [step.isNavigate, step.navigateTo, navigate, primaryProps]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    if (step.isBack && step.navigateTo) {
      navigate(step.navigateTo);
      setTimeout(() => {
        backProps.onClick({ preventDefault: () => {} });
      }, 100);
    } else {
      backProps.onClick({ preventDefault: () => {} });
    }
  }, [step.isBack, step.navigateTo, navigate, backProps]);

  // Trigger a 5-second delay to show the primary button if step.content2 exists
  useEffect(() => {
    if (step.content2) {
      const timer = setTimeout(() => {
        setShowPrimaryButton(true);
      }, 7000); // 5 seconds delay

      return () => clearTimeout(timer); // Clean up the timeout on unmount or if step changes
    }
  }, [step.content2]);

  return (
    <div className="tooltip__body" {...tooltipProps}>
      {step.title && <h4 className="tooltip__title">{step.title}</h4>}
      <div className="tooltip__content">{step.content}</div>
      {step.content2 && <div className="tooltip__content">{step.content2}</div>}
      {step.haveImage && <img src={step.image} alt="" />}

      <div className="tooltip__footer">
        <button className="tooltip__button" {...skipProps}>
          {skipProps.title}
        </button>

        <div className="tooltip__spacer">
          {index > 0 && <button onClick={handleBack}>{backProps.title}</button>}

          {continuous && showPrimaryButton && (
            <button onClick={handleNext}>{primaryProps.title}</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalkthroughCustomTooltip;
