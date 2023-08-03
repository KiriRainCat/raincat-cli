import updater from "pkg-updater";
import { pkginfo } from "../info.cjs";

export default updater({
  pkg: pkginfo,
  checkInterval: 8 * 60 * 60 * 1000,
  level: "patch",
});
