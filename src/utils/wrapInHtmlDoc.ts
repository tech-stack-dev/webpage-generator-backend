export const wrapInHtmlDoc = (fragment: string) => `
<!DOCTYPE html>
<html lang="en">
<head><title>Validation</title></head>
<body>
${fragment}
</body>
</html>
`;
