import { CloseX } from "../icons/Icons";

export const ClearIndicator = (props: any) => {
  const {
    children = <CloseX />,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref}>
      <div>{children}</div>
    </div>
  );
};
