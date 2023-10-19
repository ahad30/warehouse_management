import React, { useEffect } from "react";
import {
  Stepper,
  Step,
  Button,
  Typography,
  CardHeader,
} from "@material-tailwind/react";

import PreInstallation from "./PreInstallation";
import Verification from "./Verification";
import Configuration from "./Configuration";
import InstallationFinish from "./InstallationFinish";
import {
  useGetStepOneQuery,
  usePostStepFourMutation,
  usePostStepThreeMutation,
} from "../../features/Installation/installationApi";

export function Installation() {
  const { data: stepOneData } = useGetStepOneQuery();
  const [postStepThreeData, { data: stepThreeData }] =
    usePostStepThreeMutation();
  const [postStepFourData, { data: stepFourData }] = usePostStepFourMutation();

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => {
    console.log(activeStep);
    if (activeStep > 2) {
      setIsLastStep(true);
      alert("last step");
    }
    !isLastStep && setActiveStep((cur) => cur + 1);
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full py-4 px-8 space-y-[10rem] m-auto max-w-[1200px]">
      <Stepper
        activeStep={activeStep}
        lineClassName="bg-blue-400/50"
        activeLineClassName="bg-blue-400"
      >
        <Step
          className="h-4 w-4 !bg-blue-300 text-gray-400 cursor-pointer"
          activeClassName="ring-0 !bg-blue-600 text-gray-400"
          completedClassName="!bg-blue-200 text-blue-400"
          onClick={() => setActiveStep(0)}
        >
          <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
            <Typography variant="h6" color="black">
              Pre Installation
            </Typography>
          </div>
        </Step>
        <Step
          className="h-4 w-4 !bg-blue-300 text-gray-400/75 cursor-pointer"
          activeClassName="ring-0 !bg-blue-600 text-gray-400"
          completedClassName="!bg-blue-200 text-blue-400"
          onClick={() => setActiveStep(1)}
        >
          <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
            <Typography variant="h6" color="black">
              Verification
            </Typography>
          </div>
        </Step>
        <Step
          className="h-4 w-4 !bg-blue-300 text-gray-400/75 cursor-pointer"
          activeClassName="ring-0 !bg-blue-600 text-gray-400"
          completedClassName="!bg-blue-200 text-blue-400"
          onClick={() => setActiveStep(2)}
        >
          <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
            <Typography variant="h6" color="black">
              Configuration
            </Typography>
          </div>
        </Step>
        <Step
          className="h-4 w-4 !bg-blue-300 text-gray-400/75 cursor-pointer"
          activeClassName="ring-0 !bg-blue-600 text-gray-400"
          completedClassName="!bg-blue-200 text-blue-400"
          onClick={() => setActiveStep(3)}
        >
          <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
            <Typography variant="h6" color="black">
              InstallationFinish
            </Typography>
          </div>
        </Step>
      </Stepper>
      {/* change component depends on steps  */}
      {activeStep === 0 ? (
        <PreInstallation />
      ) : activeStep === 1 ? (
        <Verification />
      ) : activeStep === 2 ? (
        <Configuration />
      ) : activeStep === 3 ? (
        <InstallationFinish />
      ) : (
        ""
      )}
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={isLastStep || !stepOneData?.requirementForStep1}
        >
          {activeStep >= 3 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}
export default Installation;
