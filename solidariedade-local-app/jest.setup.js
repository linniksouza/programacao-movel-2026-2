jest.mock('react-native-safe-area-context', () => {
    const inset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    return {
        ...jest.requireActual('react-native-safe-area-context'),
        SafeAreaProvider: ({ children }) => children,
        SafeAreaConsumer: ({ children }) => children(inset),
        useSafeAreaInsets: () => inset,
        useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
    };
});
