import * as React from "react";

import { cn } from "@/lib/utils";

const CollapsibleContext = React.createContext(null);

function Collapsible({ defaultOpen = false, open: openProp, onOpenChange, asChild, children, className }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = openProp ?? internalOpen;
  const setOpen = React.useCallback(
    (nextOpen) => {
      setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange]
  );
  const Comp = asChild ? React.Fragment : "div";

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      {asChild ? (
        React.cloneElement(React.Children.only(children), {
          "data-state": open ? "open" : "closed",
          className: cn(children.props.className, className),
        })
      ) : (
        <Comp data-state={open ? "open" : "closed"} className={className}>
          {children}
        </Comp>
      )}
    </CollapsibleContext.Provider>
  );
}

function CollapsibleTrigger({ asChild, children }) {
  const context = React.useContext(CollapsibleContext);

  if (!context) {
    throw new Error("CollapsibleTrigger must be used within Collapsible.");
  }

  const handleClick = (event) => {
    children.props?.onClick?.(event);
    if (!event.defaultPrevented) {
      context.setOpen(!context.open);
    }
  };

  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      "aria-expanded": context.open,
      "data-state": context.open ? "open" : "closed",
      onClick: handleClick,
    });
  }

  return (
    <button
      type="button"
      aria-expanded={context.open}
      data-state={context.open ? "open" : "closed"}
      onClick={() => context.setOpen(!context.open)}
    >
      {children}
    </button>
  );
}

function CollapsibleContent({ children, className }) {
  const context = React.useContext(CollapsibleContext);

  if (!context?.open) {
    return null;
  }

  return (
    <div data-state="open" className={className}>
      {children}
    </div>
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
