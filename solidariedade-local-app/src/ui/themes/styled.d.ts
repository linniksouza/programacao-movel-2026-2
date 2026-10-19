import "styled-components/native";

import { AppThemeType } from "./index";

declare module "styled-components/native" {
    export interface DefaultTheme extends AppThemeType {}
}
