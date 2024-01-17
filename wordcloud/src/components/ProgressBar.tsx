import React from "react";

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps): JSX.Element {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {`${progress.toFixed(2)}%`}
      </div>
    </div>
  );
}

export default ProgressBar;
