// useAbility.ts
import { useEffect, useState } from "react";

import { useAppSelector } from "../store/reduxHooks";
import AccessAbility from "../utils/casl/defineAbility";
import { AbilityTuple, MongoAbility, MongoQuery } from "@casl/ability";

const useAbility = () => {
  const accessData = useAppSelector((state) => state?.access?.accessData);
  const [ability, setAbility] = useState<
    MongoAbility<AbilityTuple, MongoQuery> | undefined
  >();

  useEffect(() => {
    setAbility(AccessAbility.getAbility(accessData));
  }, [accessData]);

  return ability;
};

export default useAbility;
