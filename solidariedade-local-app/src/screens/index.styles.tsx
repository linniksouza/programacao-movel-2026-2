import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const ScreenContainer = styled(SafeAreaView).attrs({
    edges: [
        "left",
        "right"
    ]
})`
    flex: 1;
`;

export { ScreenContainer };
