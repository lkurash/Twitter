export const mockedComponent = (component) => {
  return (
    <div
      data-testid={`mocked-${component[0].toLowerCase()}${component.slice(1)}`}
    >
      Mocked {component}
    </div>
  );
};
