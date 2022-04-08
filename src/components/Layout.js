import MenuAppBar from "./MenuAppBar";

export function Layout(props) {
  return (
    <>
      <MenuAppBar></MenuAppBar>
      {props.children}
    </>
  );
}
