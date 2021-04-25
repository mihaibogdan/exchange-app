// styled.d.ts
import 'styled-components';

import { ITheme } from 'common/types/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
