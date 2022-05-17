import { useContext } from "react";

import CatsOutput from "../components/CatsOutput/CatsOutput";
import { CatsContext } from "../store/cats-context";

function AllCats() {
  const catsCtx = useContext(CatsContext);

  return (
    <CatsOutput
      cats={catsCtx.cats}
      catsPeriod="Total"
      fallbackText="No registered cats found!"
    />
  );
}

export default AllCats;
