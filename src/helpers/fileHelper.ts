export const readFile = (file: File) => new Promise((resolve: (value: string) => void, reject) => {
    const reader = new FileReader();

    reader.addEventListener(
        'load',
        () => {
            const result = reader.result;
            if (result && typeof result === 'string') {
                resolve(result);
            } else {
                reject('Could not upload file');
            }
        },
        false,
    );

    reader.readAsText(file);
})