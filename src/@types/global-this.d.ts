import { ConfigType } from "../types/config.type.js";

declare global {
  // eslint-disable-next-line no-var
  var APP_CONFIG: ConfigType;
}
