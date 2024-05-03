// ability.ts
import { store } from "@/app/store/store";
import { defineAbility, AbilityTuple, MongoAbility, MongoQuery } from "@casl/ability";
import { ICaslData } from "@/app/store/slices/accessSlice";

class AccessAbility {
  private static ability: MongoAbility<AbilityTuple, MongoQuery> | undefined = undefined;

  private constructor() { }

  static getAbility() {
    if (!AccessAbility.ability) {
      const access = store.getState().access.accessData;

      if (access.length === 0) return undefined;

      AccessAbility.ability = defineAbility((can, cannot) => {
        access.forEach((ele: ICaslData) => {
          const { action, subject, fields, conditions } = ele;
          if (fields && fields.length && conditions && conditions.length) {
            can(action, subject, fields, conditions);
          } else if (fields && fields.length) {
            can(action, subject, fields);
          } else if (conditions && conditions.length) {
            can(action, subject, undefined, conditions);
          } else {
            can(action, subject);
          }
        });
      });
    }
    return AccessAbility.ability;
  }
}

export default AccessAbility;
