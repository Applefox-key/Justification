const SidePanel = ({ children, edit }) => {
  return <div className={"variants-wrap-txt" + (edit ? "-edit" : " h-fit ")}>{children}</div>;
};
export default SidePanel;
