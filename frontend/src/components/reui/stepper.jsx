import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const StepperContext = createContext(null);

export function useStepper() {
  const context = useContext(StepperContext);
  if (!context) throw new Error("useStepper must be used within a Stepper component");
  return context;
}

export function Stepper({ defaultValue = 1, value, onValueChange, indicators, className, children }) {
  const [internalStep, setInternalStep] = useState(defaultValue);
  const currentStep = value !== undefined ? value : internalStep;

  const handleStepChange = (step) => {
    if (value === undefined) setInternalStep(step);
    if (onValueChange) onValueChange(step);
  };

  return (
    <StepperContext.Provider value={{ currentStep, setStep: handleStepChange, indicators }}>
      <div className={cn("flex flex-col", className)}>{children}</div>
    </StepperContext.Provider>
  );
}

export function StepperNav({ className, children }) {
  return <div className={cn("flex w-full justify-between gap-4", className)}>{children}</div>;
}

export function StepperItem({ step, className, children }) {
  const { currentStep } = useContext(StepperContext);
  const isCompleted = currentStep > step;
  const isCurrent = currentStep === step;

  return (
    <div
      className={cn("group flex-1", className)}
      data-state={isCompleted ? "completed" : isCurrent ? "current" : "inactive"}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { step, isCompleted, isCurrent });
        }
        return child;
      })}
    </div>
  );
}

export function StepperTrigger({ className, children, step }) {
  const { setStep } = useStepper();
  return (
    <button
      type="button"
      onClick={() => setStep(step)}
      className={cn("flex flex-col items-center gap-2 text-center", className)}
    >
      {children}
    </button>
  );
}

export function StepperIndicator({ className, children, isCompleted, isCurrent }) {
  const { indicators } = useContext(StepperContext);

  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
        isCompleted
          ? "border-[#0b6b35] bg-[#0b6b35] text-white"
          : isCurrent
          ? "border-[#0b6b35] text-[#0b6b35] dark:border-[#4ade80] dark:text-[#4ade80]"
          : "border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-500",
        className
      )}
    >
      {isCompleted && indicators?.completed ? indicators.completed : children}
    </div>
  );
}

export function StepperTitle({ className, children }) {
  return (
    <h3 className={cn("text-sm font-semibold text-slate-900 dark:text-slate-100", className)}>
      {children}
    </h3>
  );
}

export function StepperDescription({ className, children }) {
  return (
    <p className={cn("text-xs text-slate-500 dark:text-slate-400", className)}>{children}</p>
  );
}

export function StepperSeparator({ className, isCompleted }) {
  return (
    <div
      className={cn(
        "h-[2px] w-full bg-slate-200 dark:bg-slate-800",
        isCompleted && "bg-[#0b6b35] dark:bg-[#4ade80]",
        className
      )}
    />
  );
}

export function StepperPanel({ className, children }) {
  return <div className={cn("mt-8", className)}>{children}</div>;
}

export function StepperContent({ value, className, children }) {
  const { currentStep } = useStepper();
  return (
    <div
      className={cn(
        "animate-in fade-in zoom-in-95 duration-300",
        currentStep !== value && "hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
