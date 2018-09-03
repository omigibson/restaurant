import React from 'react';

const ProgressBar = (props) => {
  // const steps = ["1. Select guests", "2. Select date", "3. Confirm"]
  // let currentStep = props.currentStep;
  // let progress = steps.map((step, index) => {
  //   console.log(index);
  //   if (currentStep === index){
  //     return <h2 key={index} className="bold">{step}</h2>
  //     }
  //   else {
  //       return <h2 key={index}>{step}</h2>
  //     }
  //   }
  //   );
  //
  // return (
  //   progress
  // );

  return (
    <progress value={props.progressValue} max="100"></progress>
  )
}

export default ProgressBar;
