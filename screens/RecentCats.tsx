import { useContext, useEffect, useState } from "react";

import CatsOutput from "../components/CatsOutput/CatsOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { CatsContext } from "../store/cats-context";
import { catObjType } from "../types/types";
import { getDateMinusDays } from "../util/date";
import { fetchCats } from "../util/http";

function RecentCats() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const catsCtx = useContext(CatsContext);

  useEffect(() => {
    async function getCats() {
      setIsFetching(true);
      try {
        const cats = await fetchCats();
        catsCtx.setCats(cats);
      } catch (error) {
        setError("Could not fetch cats!");
      }
      setIsFetching(false);
    }

    getCats();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentCats = catsCtx.cats.filter((cat: catObjType) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return cat.date >= date7DaysAgo && cat.date <= today;
  });

  return (
    <CatsOutput
      cats={recentCats}
      catsPeriod="Last 7 Days"
      fallbackText="No cats registered for the last 7 days."
    />
  );
}

export default RecentCats;
