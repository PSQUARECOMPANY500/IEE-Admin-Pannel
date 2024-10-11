import { useNavigate } from "react-router-dom";

function WalkthroughCustomTooltip(props) {
  const {
    backProps,
    continuous,
    index,
    primaryProps,
    skipProps,
    step,
    tooltipProps,
  } = props;

  const navigate = useNavigate();
  const handleNext = () => {
    if (step.isNavigate && step.navigateTo) {
      navigate(step.navigateTo);

      setTimeout(() => {
        primaryProps.onClick({ preventDefault: () => {} });
      }, 100);
    } else {
      primaryProps.onClick({ preventDefault: () => {} });
    }
  };

  return (
    <div className="tooltip__body" {...tooltipProps}>
      {step.title && <h4 className="tooltip__title">{step.title}</h4>}
      <div className="tooltip__content">{step.content}</div>
      <div className="tooltip__footer">
        <button className="tooltip__button" {...skipProps}>
          {skipProps.title}
        </button>
        <div className="tooltip__spacer">
          {index > 0 && (
            <button className="tooltip__button" {...backProps}>
              {backProps.title}
            </button>
          )}
          {continuous && (
            <button
              className="tooltip__button tooltip__button--primary"
              onClick={handleNext}
            >
              {primaryProps.title}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalkthroughCustomTooltip;
