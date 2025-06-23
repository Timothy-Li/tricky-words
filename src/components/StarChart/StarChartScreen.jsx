import StarDisplay from "./StarDisplay";

export default function StarChartScreen({ child }) {
  return (
    <>
      <h2>{child.name}'s Star Chart</h2>
      <StarDisplay stars={child.stars} />
    </>
  );
}
